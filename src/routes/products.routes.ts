import { Router } from "express";
import { ProductsController } from "../controller/products/products.controller";
import { ProductsService } from "../services/products.service";

const productsRouter = Router();

const productsService = new ProductsService();
const productsController = new ProductsController(productsService);

productsRouter.get("/:id", productsController.getProducts.bind(productsController));
productsRouter.put("/:id", productsController.updateProducts.bind(productsController));
productsRouter.post(
  "/:id",
  productsController.createProductsList.bind(productsController),
);

export default productsRouter;
