import { User } from "@controller/user";
import pool from "db";

export interface IUserService {
  getUserById: (id: string) => Promise<User>;
}

export class UserService implements IUserService {
  async getUserById(id: string) {
    const user = await pool.query("select * from users where id = $1", [id]);
    return user.rows[0];
  }
}
