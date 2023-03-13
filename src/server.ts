import express, { Express } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import cors from "cors"
import userRouter from "./routes/user.routes";
import likesRouter from "./routes/likes.routes";
import productsRouter from "./routes/products.routes";
import recipesRouter from "./routes/recipes.routes";
import authRouter from "./routes/auth.routes";
import { errorMiddleware } from "./middlewares/error-middleware";
import URLS from "./constants/urls";

dotenv.config();
const PORT = process.env.PORT || 8080;

const app: Express = express();

app.use(express.json());
app.use(cookieParser());
// app.use(cors())

app.use(URLS.USERS.BASE, userRouter);
app.use(URLS.LIKES.BASE, likesRouter);
app.use(URLS.PRODUCTS.BASE, productsRouter);
app.use(URLS.RECIPES.BASE, recipesRouter);
app.use(URLS.AUTH.BASE, authRouter);

app.use(errorMiddleware);

app.listen(PORT, () => console.log("server was started"));
