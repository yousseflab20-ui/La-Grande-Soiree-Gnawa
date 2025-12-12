import express from "express";
import cors from "cors";
import { syncDatabase } from "./config/db.js";

import "./models/event.Info.js";
import "./models/artist.js";
import "./models/bookings.js";

import eventRoutes from "./routes/event.routes.js";
import artistRoutes from "./routes/artist.routes.js";
import authRoutes from "./routes/auth.routes.js"
import adminArtistsRoutes from "./routes/adminArtists.routes.js";
import bookingsRouter from "./routes/bookings.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

syncDatabase();

app.use("/api/EventInfo", eventRoutes);
app.use("/api/Artist", artistRoutes);
app.use("/api/bookings", bookingsRouter);
app.use("/api/auth", authRoutes);
app.use("/api/admin/artists", adminArtistsRoutes);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});