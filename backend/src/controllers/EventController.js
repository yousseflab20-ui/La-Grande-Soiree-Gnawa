import eventRoute from "../models/event.Info.js";

export const getEvent = async (req, res) => {
    try {
        const EventInfo = await eventRoute.findOne();

        if (!EventInfo) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.json(EventInfo);
    } catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).json({ error: error.message });
    }
};

export const createOrUpdateEvent = async (req, res) => {
    try {
        const { title, description, date, location, banner_url } = req.body;

        if (!title || !description || !date || !location) {
            return res.status(400).json({
                error: "title, description, date, and location are required"
            });
        }

        let event = await eventRoute.findOne();

        if (event) {
            await event.update({
                title,
                description,
                date,
                location,
                banner_url: banner_url || event.banner_url
            });
        } else {
            event = await eventRoute.create({
                title,
                description,
                date,
                location,
                banner_url
            });
        }

        res.status(201).json(event);
    } catch (error) {
        console.error("Error creating/updating event:", error);
        res.status(500).json({ error: error.message });
    }
};