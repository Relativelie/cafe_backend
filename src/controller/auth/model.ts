import { NextFunction, Request, Response } from "express";
import { UserDto } from "../../dto/UserDto";
import { UserToken } from "../../services/token.service";

export interface IAuthController {
  registration: (req: CommonReq, res: CommonRes, next: NextFunction) => void;
  login: (req: CommonReq, res: CommonRes, next: NextFunction) => void;
  logout: (req: CookiesReq, res: Response<UserToken>, next: NextFunction) => void;
  activate: (req: ActivateReq, res: Response, next: NextFunction) => void;
  refresh: (req: CookiesReq, res: CommonRes, next: NextFunction) => void;
}

export type UserData = {
  user: UserDto;
  accessToken: string;
  refreshToken: string;
};
export type CommonRes = Response<UserData>;

export interface CommonReq extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface ActivateReq extends Request {
  params: {
    link: string;
  };
}

export interface CookiesReq extends Request {
  cookies: {
    refreshToken: string;
  };
}
