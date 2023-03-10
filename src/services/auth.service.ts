import pool from "../db";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { IMailService } from "./mail.service";
import { ITokenService, UserToken } from "./token.service";
import { UserDto } from "../dto/UserDto";
import { ApiError } from "../exceptions/api-error";
import { errorTexts } from "../constants/error-texts";
import { UserData } from "../controller/auth/model";
import { User } from "../controller/person/model";

export interface IAuthService {
  registration: (email: string, pass: string) => Promise<UserData>;
  login: (email: string, pass: string) => Promise<UserData>;
  activate: (activationLink: string) => void;
  logout: (refreshToken: string) => Promise<UserToken>;
  refresh: (refreshToken: string) => Promise<UserData>;
}

export class AuthService implements IAuthService {
  constructor(private mailService: IMailService, private tokenService: ITokenService) {}

  async registration(email: string, pass: string) {
    const existedUserQuery = "select * from users where email = $1";
    const existedUser = await pool.query(existedUserQuery, [email]);
    if (existedUser.rows[0]) {
      throw ApiError.BadRequest(`${errorTexts.existedEmail}: ${email}`);
    }

    const hashPass = await bcrypt.hash(pass, 3);
    const activationLink = v4();
    const newUserQuery =
      "INSERT INTO users (email, password, activation_link, is_activated) values ($1, $2, $3, $4) RETURNING *";
    const newUser = await pool.query(newUserQuery, [
      email,
      hashPass,
      activationLink,
      false,
    ]);
    // send Email with activate link
    // await this.mailService.sendActivationMail(email, `${process.env.API_URL}/activate/${activationLink}`);
    return await this.setTokens(newUser.rows[0]);
  }

  async activate(activationLink: string) {
    const existedUserQuery = "select * from users where activation_link=$1";
    const existedUser = await pool.query(existedUserQuery, [activationLink]);
    if (!existedUser.rows[0]) {
      throw ApiError.BadRequest(errorTexts.incorrectActivationLink);
    }
    const updateUserQuery =
      "update users SET is_activated=$1 WHERE activation_link=$2 RETURNING *";
    await pool.query(updateUserQuery, [true, activationLink]);
  }

  async login(email: string, pass: string) {
    const existedUser = await pool.query("select * from users where email = $1", [email]);
    if (!existedUser.rows[0]) {
      throw ApiError.BadRequest(errorTexts.wrongEmailPass);
    }
    const isPassEquals = await bcrypt.compare(pass, existedUser.rows[0].password);
    if (!isPassEquals) {
      throw ApiError.BadRequest(errorTexts.wrongEmailPass);
    }
    return await this.setTokens(existedUser.rows[0]);
  }

  async logout(refreshToken: string) {
    const token = await this.tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await this.tokenService.findToken(refreshToken);
    if (!userData && !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }
    const selectUserQuery = "select * from users where id = $1";
    const user = await pool.query(selectUserQuery, [(userData as UserDto).id]);
    return await this.setTokens(user.rows[0]);
  }

  async setTokens(user: User): Promise<UserData> {
    const userDto = new UserDto(user);
    const tokens = this.tokenService.generateTokens({ ...userDto });
    await this.tokenService.saveToKen(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
}
