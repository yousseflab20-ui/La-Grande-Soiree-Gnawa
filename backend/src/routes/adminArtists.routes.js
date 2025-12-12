import express from "express";
import Artist from "../models/artist.js";
import { verifyToken } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
    try {
        const artist = await Artist.create(req.body);
        res.json(artist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id", verifyToken, async (req, res) => {
    try {
        const artist = await Artist.findByPk(req.params.id);
        if (!artist) return res.status(404).json({ error: "Artist not found" });

        await artist.update(req.body);
        res.json(artist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const artist = await Artist.findByPk(req.params.id);
        if (!artist) return res.status(404).json({ error: "Artist not found" });

        await artist.destroy();
        res.json({ message: "Artist deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
