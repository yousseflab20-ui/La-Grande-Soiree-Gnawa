import { Router } from "express";
import { getEvent, createOrUpdateEvent } from "../controllers/EventController.js";

const router = Router();

router.get("/", getEvent);
router.post("/", createOrUpdateEvent);

export default router;