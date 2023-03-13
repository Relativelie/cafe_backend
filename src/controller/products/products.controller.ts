import { NextFunction } from "express";
import { errorTexts } from "@constants/error-texts";
import { ApiError } from "@exceptions/api-error";
import {
  GetProductReq,
  IProductsController,
  PostProductReq,
  ProductRes,
  ProductsList,
  PutProductReq,
  Weekdays,
} from "./model";
import { IProductsService } from "services/products.service";

export class ProductsController implements IProductsController {
  constructor(public productsService: IProductsService) {}

  async getProducts(req: GetProductReq, res: ProductsList, next: NextFunction) {
    try {
      const userId = req.params.id;
      const products = await this.productsService.getProductsByUserId(userId);
      res.status(200).json(products);
    } catch (e) {
      next(e);
    }
  }

  async updateProducts(req: PutProductReq, res: ProductRes, next: NextFunction) {
    try {
      const userId = req.params.id;
      const { products, weekday } = req.body;
      const newProducts = await this.productsService.updateProducts(
        userId,
        weekday,
        products,
      );
      res.status(200).json(newProducts);
    } catch (e) {
      next(e);
    }
  }

  async createProductsList(req: PostProductReq, res: ProductRes, next: NextFunction) {
    try {
      const { id, weekday, products } = req.body;
      if (!Object.keys(Weekdays).some((item) => item === weekday)) {
        throw ApiError.BadRequest(`${errorTexts.validation} weekday:${weekday}`);
      }
      const productsList = await this.productsService.createProductsList(
        id,
        Weekdays[weekday],
        products,
      );
      res.status(200).json(productsList);
    } catch (e) {
      next(e);
    }
  }
}
