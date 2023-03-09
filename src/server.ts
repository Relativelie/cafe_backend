import express, { Express } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import cors from "cors"
import personRouter from "./routes/person.routes";
import likesRouter from "./routes/likes.routes";
import productsRouter from "./routes/products.routes";
import recipesRouter from "./routes/recipes.routes";
import authRouter from "./routes/auth.routes";
import { errorMiddleware } from "./middlewares/error-middleware";

dotenv.config();
const PORT = process.env.PORT || 8080;

const app: Express = express();

app.use(express.json());
app.use(cookieParser());
// app.use(cors())

app.use("/person", personRouter);
app.use("/likes", likesRouter);
app.use("/products", productsRouter);
app.use("/recipes", recipesRouter);
app.use("/", authRouter);

app.use((err: any, req: any, res: any, next: any) =>
  errorMiddleware(err, req, res, next),
);

app.listen(PORT, () => console.log("server was started"));
