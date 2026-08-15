import sequelize from "../src/config/db.js";
import Event from "../src/models/event.Info.js";
import "../src/models/artist.js";
import "../src/models/bookings.js";

const seedEvent = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ DB Connected");

        // Create tables if they don't exist
        await sequelize.sync({ alter: true });
        console.log("✅ Tables synced");

        await Event.destroy({ where: {} });

        await Event.create({
            title: "La Grande Soirée Gnawa",
            description: "Une nuit inoubliable dédiée à la musique Gnawa, patrimoine immatériel de l'humanité. Venez vivre une expérience spirituelle et musicale unique avec les plus grands maîtres du genre.",
            date: new Date("2026-12-15T21:00:00.000Z"),
            location: "Agadir, Maroc",
        });

        console.log("✅ Event seeded successfully!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Error seeding event:", err.message);
        process.exit(1);
    }
};

seedEvent();
