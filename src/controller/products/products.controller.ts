import { NextFunction } from "express";
import { IProductsService } from "../../services/products.service";
import { GetProductReq, IProductsController, ProductRes, PutProductReq } from "./model";

export class ProductsController implements IProductsController {
  constructor(public productsService: IProductsService) {}

  async getProducts(req: GetProductReq, res: ProductRes, next: NextFunction) {
    try {
      const userId = req.params.id;
      const products = await this.productsService.getProductsByUserId(userId);
      res.status(200).json({ products });
    } catch (e) {
      next(e);
    }
  }

  async updateProducts(req: PutProductReq, res: ProductRes, next: NextFunction) {
    try {
      const userId = req.params.id;
      const newProductsList = req.body.products;
      const products = await this.productsService.updateProductsByUserId(
        userId,
        newProductsList,
      );
      res.status(200).json({ products });
    } catch (e) {
      next(e);
    }
  }

  async createProductsList(req: PutProductReq, res: ProductRes, next: NextFunction) {
    try {
      const userId = req.params.id;
      await this.productsService.createProductsList(userId);
      res.status(200);
    } catch (e) {
      next(e);
    }
  }
}
