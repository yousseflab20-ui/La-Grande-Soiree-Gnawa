import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import Admin from "../models/admin"

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ where: { email } })
        if (!admin) return res.status(401).json({ error: "Invalid credentials" })
        const valid = await bcrypt.compare(password, admin.password)
        if (!valid) return res.status(401).json({ error: "Invalid credentials" })
        const tokenv = jwt.sign(
            { id: admin.id, email: admin.email },
            process.env.JWT_SECRET,
            console.log(process.env.JWT_SECRET),
            { expiresIn: "1d" }
        )
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}