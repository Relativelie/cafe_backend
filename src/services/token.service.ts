import jwt from "jsonwebtoken";
import pool from "../db";

export type UserToken = {
  user_id: number;
  refresh_token: string;
};

export type Tokens = { accessToken: string; refreshToken: string };

export interface ITokenService {
  generateTokens: (payload: any) => Tokens;
  saveToKen: (userId: string, refreshToken: string) => Promise<UserToken>;
  removeToken: (refreshToken: string) => Promise<UserToken>;
  validateAccessToken: (token: string) => string | jwt.JwtPayload | null;
  validateRefreshToken: (token: string) => string | jwt.JwtPayload | null;
  findToken: (refreshToken: string) => Promise<any>;
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
    if (existedToken.rows[0]) {
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

  async removeToken(refreshToken: string) {
    const tokenData = await pool.query(
      "delete from token where refresh_token=$1 returning *",
      [refreshToken],
    );
    return tokenData.rows[0];
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async findToken(refreshToken: string) {
    const existedToken = await pool.query(
      "select * from token where refresh_token = $1",
      [refreshToken],
    );
    return existedToken.rows[0];
  }
}
