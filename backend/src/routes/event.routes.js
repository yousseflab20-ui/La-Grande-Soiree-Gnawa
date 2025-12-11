import { Router } from "express"
import { getEvent } from "../controllers/EventController.js"

const route = Router()

route.get("/:id", getEvent)
export default route;