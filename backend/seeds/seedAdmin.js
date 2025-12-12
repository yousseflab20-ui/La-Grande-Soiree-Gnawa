import bcrypt from "bcrypt";
import db from "../src/config/db.js";
import Admin from "../src/models/admin.js";

async function seedAdmin() {
    try {
        await db.authenticate();
        console.log("DB Connected!");

        await db.sync();

        const hashedPassword = await bcrypt.hash("yourPassword", 10);

        await Admin.findOrCreate({
            where: { email: "admin@gmail.com" },
            defaults: {
                password: hashedPassword
            }
        });

        console.log("Admin seeded successfully!");
        process.exit(0);
    } catch (err) {
        console.error("Seeding error:", err);
        process.exit(1);
    }
}

seedAdmin();
