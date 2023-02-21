import { Router } from "express";
import { RecipesController } from "../controller/recipes/recipes.controller";

const recipesRouter = Router();
const recipesController = new RecipesController();

recipesRouter.get("/:id", recipesController.getRecipeById);
recipesRouter.get("/", recipesController.getAllRecipes);
recipesRouter.post("/create", recipesController.createRecipe);

export default recipesRouter;
