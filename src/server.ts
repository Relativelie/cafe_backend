import express, { Express } from "express";
import dotenv from "dotenv";
import personRouter from "./routes/person.routes";

dotenv.config();
const PORT = process.env.PORT || 8080;

const app: Express = express();

app.use(express.json());
app.use("/person", personRouter);

app.listen(PORT, () => console.log("server was started"));

// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const routes = require('./MealRoutes');

// require('dotenv').config();

// mongoose.set("strictQuery", false);

// const PORT = 7000 || process.env.port;

// mongoose
// .connect(process.env.MONGODB_LINK)
// .then(() => console.log('WE WERE CONNECTED TO MONGO'))
// .catch((err) => console.log(err))

// app.use(routes);

// app.listen(PORT, () => {
// console.log(`I AM LISTENNING ON PORT ${PORT}`)
// })

// // canshecode cugnu3-kyzNot-tyhkeh
