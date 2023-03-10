import { NextFunction, Request, Response } from "express";

export interface UserReq extends Request {
  params: {
    id: string;
  };
}

export type UserRes = Response<{
  user: User;
}>;

export interface IPersonController {
  getUserById: (req: UserReq, res: UserRes, next: NextFunction) => void;
}

export type User = {
  id: string;
  email: string;
  password: string;
  is_activated: boolean;
  activation_link: string;
};
