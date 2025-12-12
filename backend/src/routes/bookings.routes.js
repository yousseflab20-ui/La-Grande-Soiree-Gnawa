import { Router } from "express";
import { getBookingByCode, getBookingsByEmail, createBooking } from "../controllers/bookingController.js";

const router = Router();

router.get("/email/:email", getBookingsByEmail);
router.get("/:code", getBookingByCode);
router.post("/", createBooking);

export default router;
