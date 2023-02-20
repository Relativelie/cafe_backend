import { Router } from "express";

const router = Router()
const likesController = require("../controller/likes.controller")

router.get("/likes:id", likesController.getLikesById)


module.exports = router