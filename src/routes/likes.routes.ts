import { Router } from "express";
import { LikesController } from "../controller/likes/likes.controller";

const likesRouter = Router();

const likesController = new LikesController();

likesRouter.get("/:id", likesController.getLikesByPersonId);
likesRouter.put("/:id", likesController.updateLikesById);

export default likesRouter;
