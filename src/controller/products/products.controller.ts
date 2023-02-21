import pool from "../../db";
import { GetProductReq, IProductsController, ProductRes, PutProductReq } from "./model";

export class ProductsController implements IProductsController {
  async getProductsByPersonId(req: GetProductReq, res: ProductRes) {
    const personId = req.params.id;
    const products = await pool.query("select * from products where user_id = $1", [
      personId,
    ]);
    res.status(200).json({ products: products.rows[0] });
  }

  async updateProductsById(req: PutProductReq, res: ProductRes) {
    const userId = req.params.id;
    console.log(req.body);
    const newProductsList = req.body.products;
    console.log("newProductsList", newProductsList);
    const products = await pool.query(
      "update products set products_list = $1 where user_id = $2 RETURNING *",
      [newProductsList, userId],
    );
    res.status(200).json({ products: products.rows[0].products_list });
  }
}
