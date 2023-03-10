import { Router } from "express";
import { LikesController } from "../controller/likes/likes.controller";
import { LikesService } from "../services/likes.service";

const likesRouter = Router();

const likesService = new LikesService();
const likesController = new LikesController(likesService);

likesRouter.get("/:id", likesController.getLikes.bind(likesController));
likesRouter.put("/:id", likesController.updateLikes.bind(likesController));
likesRouter.post("/:id", likesController.createLikes.bind(likesController));

export default likesRouter;
