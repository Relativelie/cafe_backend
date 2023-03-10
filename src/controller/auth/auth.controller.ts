import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";
import { errorTexts } from "../../constants/error-texts";
import { ApiError } from "../../exceptions/api-error";
import { ActivateReq, CommonReq, CommonRes, CookiesReq, IAuthController } from "./model";
import { IAuthService } from "../../services/auth.service";
import { UserToken } from "../../services/token.service";

export class AuthController implements IAuthController {
  constructor(public clientAuthService: IAuthService) {}

  async registration(req: CommonReq, res: CommonRes, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest(errorTexts.validation, errors.array()));
      }
      const { email, password } = req.body;
      const userData = await this.clientAuthService.registration(email, password);
      this.setCookies(res, "refreshToken", userData.refreshToken);

      return res.status(200).json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req: CommonReq, res: CommonRes, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData = await this.clientAuthService.login(email, password);
      this.setCookies(res, "refreshToken", userData.refreshToken);
      return res.status(200).json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req: CookiesReq, res: Response<UserToken>, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const token = await this.clientAuthService.logout(refreshToken);
      this.clearCookies(res, "refreshToken");
      return res.status(200).json(token);
    } catch (e) {
      next(e);
    }
  }

  async activate(req: ActivateReq, res: Response, next: NextFunction) {
    try {
      const activationLink = req.params.link;
      await this.clientAuthService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL!);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req: CookiesReq, res: CommonRes, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await this.clientAuthService.refresh(refreshToken);
      this.setCookies(res, "refreshToken", userData.refreshToken);
      return res.status(200).json(userData);
    } catch (e) {
      next(e);
    }
  }

  setCookies(res: Response, key: string, value: string) {
    res.cookie(key, value, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      // secure: true, for htpps
    });
  }

  clearCookies(res: Response, key: string) {
    res.clearCookie(key);
  }
}
