import { Router } from "express";

const personRouter = Router()
const personController = require("../controller/person.controller")

personRouter.post("/", personController.createPerson)
personRouter.get("/:id", personController.getPersonById)


export default personRouter