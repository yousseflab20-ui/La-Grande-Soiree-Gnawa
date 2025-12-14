import { Router } from "express";
import { 
    getAllBookings,
    getBookingByCode, 
    getBookingsByEmail, 
    createBooking 
} from "../controllers/bookingController.js";

const router = Router();



router.get("/", getAllBookings);

router.post("/", createBooking);

router.get("/email/:email", getBookingsByEmail);

router.get("/:code", getBookingByCode);

export default router;