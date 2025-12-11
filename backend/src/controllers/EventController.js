import eventRoute from "../model/event_info.js"

export const getEvent = async (req, res) => {
    try {
        const EventInfo = await eventRoute.findOne({ where: { id: req.params.id } });
        if (!EventInfo) return res.status(404).json({ message: "Event not found" });
        return res.json(EventInfo);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
