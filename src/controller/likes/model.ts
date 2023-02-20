import { Request, Response } from "express";

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

export interface LikesRes extends Response {
  body: {
    status: string;
    likes: number[];
  };
}

export interface ILikesController {
  getLikesByPersonId: (req: GetLikesReq, res: LikesRes) => void;
  updateLikesById: (req: UpdateLikesReq, res: LikesRes) => void;
}