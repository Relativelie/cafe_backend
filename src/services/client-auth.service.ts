import pool from "../db";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { IMailService } from "./mail.service";
import { ITokenService, UserToken } from "./token.service";
import { UserDto } from "../dto/UserDto";
import { ApiError } from "../exceptions/api-error";
import { errorTexts } from "../constants/error-texts";

export interface IClientAuthService {
  registration: (
    email: string,
    pass: string,
  ) => Promise<{ user: UserDto; accessToken: string; refreshToken: string }>;
  login: (
    email: string,
    pass: string,
  ) => Promise<{ user: UserDto; accessToken: string; refreshToken: string }>;
  activate: (activationLink: string) => void;
  logout: (refreshToken: string) => Promise<UserToken>;
  refresh: (refreshToken: string) => any;
  getAllUsers: () => any;
}

export class ClientAuthService implements IClientAuthService {
  constructor(private mailService: IMailService, private tokenService: ITokenService) {}

  async registration(email: string, pass: string) {
    const existedUser = await pool.query("select * from users where email = $1", [email]);
    if (existedUser.rows[0]) {
      throw ApiError.BadRequest(
        `A user with that email address ${email} already exists.`,
      );
    }
    const hashPass = await bcrypt.hash(pass, 3);
    const activationLink = v4();
    const user = await pool.query(
      "INSERT INTO users (email, password, activation_link, is_activated) values ($1, $2, $3, $4) RETURNING *",
      [email, hashPass, activationLink, false],
    );

    // await this.mailService.sendActivationMail(email, `${process.env.API_URL}/activate/${activationLink}`);
    const userDto = new UserDto(user.rows[0]);
    const tokens = this.tokenService.generateTokens({ ...userDto });
    await this.tokenService.saveToKen(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink: string) {
    const existedUser = await pool.query("select * from users where activation_link=$1", [
      activationLink,
    ]);
    if (!existedUser.rows[0]) {
      throw ApiError.BadRequest("Incorrect activation link");
    }
    await pool.query(
      "update users SET is_activated=$1 WHERE activation_link=$2 RETURNING *",
      [true, activationLink],
    );
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
    const userDto = new UserDto(existedUser.rows[0]);
    const tokens = this.tokenService.generateTokens({ ...userDto });
    await this.tokenService.saveToKen(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
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
    // !!! тут посмотреть че хранится в юзер дата и использовать его вместо tokenFromDB.user_id
    const user = await pool.query("select * from users where id = $1", [
      tokenFromDB.user_id,
    ]);
    const userDto = new UserDto(user.rows[0]);
    const tokens = this.tokenService.generateTokens({ ...userDto });
    await this.tokenService.saveToKen(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsers() {
    const users = await pool.query("select * from users");
    return users.rows;
  }
}
