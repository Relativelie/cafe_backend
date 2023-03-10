import { NextFunction, Request, Response } from "express";

export interface ILikesController {
  getLikes: (req: GetLikesReq, res: LikesRes, next: NextFunction) => void;
  updateLikes: (req: UpdateLikesReq, res: LikesRes, next: NextFunction) => void;
  createLikes: (req: CreateLikesReq, res: LikesRes, next: NextFunction) => void;
}

export interface GetLikesReq extends Request {
  params: {
    id: string;
  };
}

export interface UpdateLikesReq extends Request {
  body: {
    likes: number[];
  };
  params: {
    id: string;
  };
}

export interface CreateLikesReq extends Request {
  params: {
    id: string;
  };
}

export type LikesRes = Response<{ likes: number[] }>;
