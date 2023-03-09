import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { errorTexts } from "../constants/error-texts";
import { ApiError } from "../exceptions/api-error";
import { IClientAuthService } from "../services/client-auth.service";

export interface IAuthController {
  registration: (req: Request, res: Response, next: any) => void;
}
export class AuthController implements IAuthController {
  constructor(public clientAuthService: IClientAuthService) {}

  async registration(req: Request, res: Response, next: any) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest(errorTexts.validation, errors.array()));
      }
      const { email, password } = req.body;
      const userData = await this.clientAuthService.registration(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // secure: true, for htpps
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req: Request, res: Response, next: any) {
    try {
      const { email, password } = req.body;
      const userData = await this.clientAuthService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // secure: true, for htpps
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req: Request, res: Response, next: any) {
    try {
      const { refreshToken } = req.cookies;
      const token = await this.clientAuthService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async activate(req: Request, res: Response, next: any) {
    try {
      const activationLink = req.params.link;
      await this.clientAuthService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL!);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req: Request, res: Response, next: any) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await this.clientAuthService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // secure: true, for htpps
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req: Request, res: Response, next: any) {
    try {
      const users = await this.clientAuthService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
}
