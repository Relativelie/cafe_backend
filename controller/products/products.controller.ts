import pool from "../../db";
import { IProductsController, ProductReq, ProductRes } from "./model";

class ProductsController implements IProductsController {
  async getProductsByPersonId(req: ProductReq, res: ProductRes) {
    const personId = req.params.id;
    const products = await pool.query(
      "select * from products where user_id = $1",
      [personId]
    );
    res.json({ status: "ok", products: products.rows[0] });
  }
}

module.exports = new ProductsController();
