import { Router } from "express";
import { ProductsController } from "../controller/products/products.controller";

const productsRouter = Router();

const productsController = new ProductsController();

productsRouter.get("/:id", productsController.getProductsByPersonId);
productsRouter.put("/:id", productsController.updateProductsById);

export default productsRouter;
