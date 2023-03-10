import { NextFunction } from "express";
import { ILikesService } from "../../services/likes.service";
import {
  CreateLikesReq,
  GetLikesReq,
  ILikesController,
  LikesRes,
  UpdateLikesReq,
} from "./model";

export class LikesController implements ILikesController {
  constructor(public likesService: ILikesService) {}

  async getLikes(req: GetLikesReq, res: LikesRes, next: NextFunction) {
    try {
      const { id } = req.params;
      const likes = await this.likesService.getLikesByUserId(id);
      res.status(200).json({ likes });
    } catch (e) {
      next(e);
    }
  }

  async updateLikes(req: UpdateLikesReq, res: LikesRes, next: NextFunction) {
    try {
      const { id } = req.params;
      const newLikesList = req.body.likes;
      const updatedLikes = await this.likesService.updateLikesByUserId(newLikesList, id);
      res.status(200).json({ likes: updatedLikes });
    } catch (e) {
      next(e);
    }
  }

  async createLikes(req: CreateLikesReq, res: LikesRes, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.likesService.createUserLikes(id);
      res.status(200);
    } catch (e) {
      next(e);
    }
  }
}
