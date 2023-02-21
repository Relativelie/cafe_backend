import express, { Express } from "express";
import dotenv from "dotenv";
import personRouter from "./routes/person.routes";
import likesRouter from "./routes/likes.routes";
import productsRouter from "./routes/products.routes";
import recipesRouter from "./routes/recipes.routes";

dotenv.config();
const PORT = process.env.PORT || 8080;

const app: Express = express();

app.use(express.json());
app.use("/person", personRouter);
app.use("/likes", likesRouter);
app.use("/products", productsRouter);
app.use("/recipes", recipesRouter);

app.listen(PORT, () => console.log("server was started"));
