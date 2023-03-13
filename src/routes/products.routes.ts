import URLS from "@constants/urls";
import { ProductsController } from "@controller/index";
import { Router } from "express";
import { authMiddleware } from "@middlewares/auth-middleware";
import { ProductsService } from "@services";

const productsRouter = Router();

const productsService = new ProductsService();
const productsController = new ProductsController(productsService);

productsRouter.get(
  URLS.PRODUCTS.GET_PRODUCTS,
  authMiddleware,
  productsController.getProducts.bind(productsController),
);
productsRouter.put(
  URLS.PRODUCTS.UPDATE_PRODUCTS,
  authMiddleware,
  productsController.updateProducts.bind(productsController),
);
productsRouter.post(
  URLS.PRODUCTS.CREATE_PRODUCTS,
  authMiddleware,
  productsController.createProductsList.bind(productsController),
);

export default productsRouter;
