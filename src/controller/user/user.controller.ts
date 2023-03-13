import { NextFunction } from "express";
import { IUserService } from "services/user.service";
import { IPersonController as IUserController, UserReq, UserRes } from "./model";

export class UserController implements IUserController {
  constructor(public userService: IUserService) {}

  async getUserById(req: UserReq, res: UserRes, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);
      res.status(200).json({ user });
    } catch (e) {
      next(e);
    }
  }
}
