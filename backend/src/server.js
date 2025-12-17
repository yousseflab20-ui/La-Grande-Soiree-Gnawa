import express from "express";
import cors from "cors";
import { syncDatabase } from "./config/db.js";

import "./models/event.Info.js";
import "./models/artist.js";
import "./models/bookings.js";

import eventRoutes from "./routes/event.routes.js";
import artistRoutes from "./routes/artist.routes.js";
import bookingsRouter from "./routes/bookings.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

syncDatabase();

app.use("/api/eventinfo", eventRoutes);
app.use("/api/artist", artistRoutes);
app.use("/api/bookings", bookingsRouter);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});