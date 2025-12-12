import express from "express"
import artist from "../models/artist.js"

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const Artist = await artist.findAll()
        res.json(Artist)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const Artist = await artist.findByPk(req.params.id)
        if (!Artist) {
            return res.status(404).json({ error: "Artist not found" })
        }
        res.json(Artist)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post("/", async (req, res) => {
    try {
        const { name, photo, description } = req.body;

        const newArtist = await artist.create({
            name,
            photo,
            description
        });

        res.status(201).json(newArtist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

export default router;