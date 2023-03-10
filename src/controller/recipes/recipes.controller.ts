import { NextFunction } from "express";
import { IRecipesService } from "../../services/recipes.service";
import {
  AllRecipesReq,
  AllRecipesRes,
  CreateRecipeReq,
  IRecipesController,
  RecipeReq,
  RecipeRes,
} from "./model";

export class RecipesController implements IRecipesController {
  constructor(public recipeService: IRecipesService) {}

  async getRecipe(req: RecipeReq, res: RecipeRes, next: NextFunction) {
    try {
      const { id } = req.params;
      const recipe = await this.recipeService.getRecipeById(id);
      res.status(200).json(recipe);
    } catch (e) {
      next(e);
    }
  }

  async getAllRecipes(req: AllRecipesReq, res: AllRecipesRes, next: NextFunction) {
    try {
      const { from, limit } = req.query;
      const recipes = await this.recipeService.getAllRecipes(from, limit);
      res.status(200).json({ items: recipes, from, limit });
    } catch (e) {
      next(e);
    }
  }

  async createRecipe(req: CreateRecipeReq, res: RecipeRes, next: NextFunction) {
    try {
      const { title, link_id } = req.body;
      const recipe = await this.recipeService.createRecipe(title, link_id);
      res.status(200).json(recipe);
    } catch (e) {
      next(e);
    }
  }
}
