import booking from "../model/bookings"
import artist from "../model/artist"
import booking from "../model/bookings"

function makeCode() {
    return "AGD" + Math.random().toString(36).substring(2, 8).toUpperCase()
}
export const getBookingByCode = async (req, res) => {
    try {
        const Booking = await booking.findOne({ where: req.param.code, include: artist })
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" })
        }
        res.json(Booking)
    } catch (err) {
        res.status(500).json({ error: "server error" });
    }
}

export const getBookingsByEmail = async (res, req) => {
    try {
        const Booking = await booking.findAll({ customer_email: req.param.email, include: artist })
        res.json(Booking);
    } catch (err) {
        res.status(500).json({ error: "server error" });
    }
}