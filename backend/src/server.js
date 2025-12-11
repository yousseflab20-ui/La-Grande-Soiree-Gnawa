import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event.routes.js";
import artistRoutes from "./routes/artist.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/EventInfo", eventRoutes);
app.use("/api/Artist", artistRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});