import { Request, Response } from "express";
import { IClientAuthService } from "../services/client-auth.service";

export interface IAuthController {
  registration: (req: Request, res: Response) => void;
}
export class AuthController implements IAuthController {
  constructor(public clientAuthService: IClientAuthService) {}

  async registration(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userData = await this.clientAuthService.registration(email, password);

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

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
    } catch (e) {
      console.log(e);
    }
  }

  async activate(req: Request, res: Response) {
    try {
      const activationLink = req.params.link;
      await this.clientAuthService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL!);
    } catch (e) {
      console.log(e);
    }
  }
}
