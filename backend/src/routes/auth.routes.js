import express from "express";
import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ where: { email } });
        if (!admin) return res.status(401).json({ error: "Admin not found" });

        const valid = await bcrypt.compare(password, admin.password);
        if (!valid) return res.status(401).json({ error: "Invalid password" });

        const token = jwt.sign(
            { id: admin.id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
