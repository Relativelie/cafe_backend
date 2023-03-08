import pool from "../db";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { IMailService } from "./mail.service";
import { ITokenService } from "./token.service";
import { UserDto } from "../dto/UserDto";

export interface IClientAuthService {
  registration: (
    email: string,
    pass: string,
  ) => Promise<{ user: UserDto; accessToken: string; refreshToken: string }>;
  // login: (
  //   email: string,
  //   pass: string,
  // ) => void
  activate: (activationLink: string) => void;
}

export class ClientAuthService implements IClientAuthService {
  constructor(private mailService: IMailService, private tokenService: ITokenService) {}

  async registration(email: string, pass: string) {
    const existedUser = await pool.query("select * from users where email = $1", [email]);
    if (existedUser.rows[0]) {
      throw new Error(`A user with that email address ${email} already exists.`);
    }
    const hashPass = await bcrypt.hash(pass, 3);
    const activationLink = v4();
    const user = await pool.query(
      "INSERT INTO users (email, password, activation_link, is_activated) values ($1, $2, $3, $4) RETURNING *",
      [email, hashPass, activationLink, false],
    );

    // await this.mailService.sendActivationMail(email, `${process.env.API_URL}/activate/${activationLink}`);
    const userDto = new UserDto(user.rows[0]);
    console.log("userDto", userDto);
    const tokens = this.tokenService.generateTokens({ ...userDto });
    await this.tokenService.saveToKen(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink: string) {
    console.log(activationLink);
    const existedUser = await pool.query("select * from users where activation_link=$1", [
      activationLink,
    ]);
    console.log(existedUser.rows[0]);
    if (!existedUser.rows[0]) {
      throw new Error("Incorrect activation link");
    }
    await pool.query(
      "update users SET is_activated=$1 WHERE activation_link=$2 RETURNING *",
      [true, activationLink],
    );
  }
  // async login(email: string, pass: string) {
  //   const existedUser = await pool.query("select * from users where email = $1", [email]);
  //   if (existedUser.rows[0]) {

  //   }
  // }
}
