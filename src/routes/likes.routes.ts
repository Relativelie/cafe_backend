import { Router } from "express";
import URLS from "@constants/urls";
import { authMiddleware } from "@middlewares/auth-middleware";
import { LikesController } from "@controller/index";
import { LikesService } from "@services/likes.service";

const likesRouter = Router();

const likesService = new LikesService();
const likesController = new LikesController(likesService);

likesRouter.get(
  URLS.LIKES.GET_LIKES,
  authMiddleware,
  likesController.getLikes.bind(likesController),
);
likesRouter.put(
  URLS.LIKES.UPDATE_LIKES,
  authMiddleware,
  likesController.updateLikes.bind(likesController),
);
likesRouter.post(
  URLS.LIKES.CREATE_LIKES,
  authMiddleware,
  likesController.createLikes.bind(likesController),
);

export default likesRouter;
