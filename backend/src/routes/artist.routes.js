import express from "express"
import artist from "../model/artist.js"

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
        if (!Artist) res.status(400).json({ error: "Artist not found" })
        res.json(Artist)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})
export default router;