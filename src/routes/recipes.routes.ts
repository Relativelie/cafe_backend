import { Router } from "express";
import { RecipesController } from "../controller/recipes/recipes.controller";
import { RecipesService } from "../services/recipes.service";

const recipesRouter = Router();

const recipesService = new RecipesService();
const recipesController = new RecipesController(recipesService);

recipesRouter.get("/:id", recipesController.getRecipe.bind(recipesController));
recipesRouter.get("/", recipesController.getAllRecipes.bind(recipesController));
recipesRouter.post("/create", recipesController.createRecipe.bind(recipesController));

export default recipesRouter;
