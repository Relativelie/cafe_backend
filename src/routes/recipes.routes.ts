import { Router } from "express";
import URLS from "@constants/urls";
import { RecipesController } from "@controller/index";
import { RecipesService } from "@services";

const recipesRouter = Router();

const recipesService = new RecipesService();
const recipesController = new RecipesController(recipesService);

recipesRouter.get(
  URLS.RECIPES.GET_RECIPES,
  recipesController.getRecipe.bind(recipesController),
);
recipesRouter.get(
  URLS.RECIPES.ALL_RECIPES,
  recipesController.getAllRecipes.bind(recipesController),
);
recipesRouter.post(
  URLS.RECIPES.CREATE_RECIPES,
  recipesController.createRecipe.bind(recipesController),
);

export default recipesRouter;
