import { Request, Response } from "express";
import { UserService } from "../../service/userService";
import { IAuthController } from "./model";

export class AuthController implements IAuthController {
  async registration(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userService = new UserService();
      const userData = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      });
      return res.json(userData);
    } catch (e) {
      console.log(e);
    }
  }
}
