import booking from "../models/bookings.js";
import artist from "../models/artist.js";

function makeCode() {
    return "AGD" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export const getBookingByCode = async (req, res) => {
    try {
        const Booking = await booking.findOne({
            where: { Code: req.params.code },
            include: {
                model: artist,
                attributes: ['id', 'name', 'photo', 'description']
            }
        });

        if (!Booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.json(Booking);
    } catch (err) {
        console.error("Sequelize Error:", err);
        res.status(500).json({ error: "server error" });
    }
};

export const getBookingsByEmail = async (req, res) => {
    try {
        const Bookings = await booking.findAll({
            where: { customerEmail: req.params.email },
            include: {
                model: artist,
                attributes: ['id', 'name', 'photo']
            },
            order: [['createdAt', 'DESC']]
        });

        res.json(Bookings);
    } catch (err) {
        console.error("Sequelize Error:", err);
        res.status(500).json({ error: "server error" });
    }
};

export const createBooking = async (req, res) => {
    try {
        const { customer_name, customer_email, artist_id } = req.body;

        console.log("REQ.BODY:", req.body);

        if (!customer_name || !customer_email || !artist_id) {
            return res.status(400).json({ error: "Missing fields" });
        }

        const artistExist = await artist.findByPk(artist_id);
        if (!artistExist) {
            return res.status(404).json({ error: "Artist not found" });
        }

        const code = makeCode();

        const Booking = await booking.create({
            Code: code,
            customerName: customer_name,
            customerEmail: customer_email,
            artistId: artist_id
        });

        const bookingWithArtist = await booking.findByPk(Booking.id, {
            include: {
                model: artist,
                attributes: ['id', 'name', 'photo']
            }
        });

        res.status(201).json(bookingWithArtist);
    } catch (err) {
        console.error("Sequelize Error:", err);
        res.status(500).json({ error: err.message });
    }
};
