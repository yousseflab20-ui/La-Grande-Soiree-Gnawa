import db from "./config/db.js";

(async () => {
  try {
    await db.authenticate();
    console.log("✅ Database connected!");
  } catch (error) {
    console.error("Connection error:", error);
  }
})();
