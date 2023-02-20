import { Router } from "express";
import { PersonController } from "../controller/person/person.controller";

const personRouter = Router()
const personController = new PersonController()

personRouter.post("/", personController.createPerson)
personRouter.get("/:id", personController.getPersonById)


export default personRouter