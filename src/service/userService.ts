import pool from "../db";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { TokenService } from "./tokenService";
import { MailService } from "./mailService";

interface IUserService {
  registration: (email: string, pass: string) => void;
}

export class UserService implements IUserService {
  async registration(email: string, pass: string) {
    const existedUser = await pool.query("select * from users where email = $1", [email]);
    console.log(existedUser.rows);
    if (existedUser.rows[0]) {
      throw new Error(`A user with that email address ${email} already exists.`);
    }
    const hashPass = await bcrypt.hash(pass, 3);
    const activationLink = v4();
    const user = await pool.query(
      "INSERT INTO users (email, password, activationLink) values ($1, $2, $3) RETURNING *",
      [email, hashPass, activationLink],
    );
    const mailService = new MailService();
    await mailService.sendActivationMail(email, activationLink);
    const tokenService = new TokenService();
    const { email: createdEmail, id, isActivated } = user.rows[0];
    const tokens = tokenService.generateTokens({
      email: createdEmail,
      id,
      isActivated,
    });
    await tokenService.saveToKen(id, tokens.refreshToken);
    return {
      ...tokens,
      user: {
        email: createdEmail,
        id,
        isActivated,
      },
    };
  }
}
