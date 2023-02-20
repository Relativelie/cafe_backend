import pool from "../../db";
import {
  AllRecipesReq,
  AllRecipesRes,
  IRecipesController,
  RecipeReq,
  RecipeRes,
} from "./model";

class RecipesController implements IRecipesController {
  async getRecipeById(req: RecipeReq, res: RecipeRes) {
    const recipeId = req.params.id;
    const recipe = await pool.query("select * from recipes where id = $1", [
      recipeId,
    ]);
    res.json({ status: "ok", recipe: recipe.rows[0] });
  }

  async getAllRecipes(req: AllRecipesReq, res: AllRecipesRes) {
    const { from, limit } = req.query;
    const recipe = await pool.query(
      "select * from recipes limit $1 offset $2",
      [limit, from]
    );
    res.json({ status: "ok", recipes: { items: recipe.rows[0], from, limit } });
  }
}

module.exports = new RecipesController();
