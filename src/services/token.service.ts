import jwt from "jsonwebtoken";
import pool from "../db";

type UserToken = {
  user_id: number;
  refresh_token: string;
};

export type Tokens = { accessToken: string; refreshToken: string };

export interface ITokenService {
  generateTokens: (payload: any) => Tokens;
  saveToKen: (userId: string, refreshToken: string) => Promise<UserToken>;
}
export class TokenService implements ITokenService {
  generateTokens(payload: any) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }

  async saveToKen(userId: string, refreshToken: string) {
    const existedToken = await pool.query("select * from token where user_id = $1", [
      userId,
    ]);
    if (existedToken) {
      const token = await pool.query(
        "update token SET refresh_token = $1 WHERE user_id = $2 RETURNING *",
        [refreshToken, userId],
      );
      return token.rows[0] as UserToken;
    }
    const token = await pool.query(
      "INSERT INTO token (user_id, refresh_token) values ($1, $2) RETURNING *",
      [userId, refreshToken],
    );
    return token.rows[0] as UserToken;
  }
}
