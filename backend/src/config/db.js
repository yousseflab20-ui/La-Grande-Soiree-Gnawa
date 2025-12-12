import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

console.log("Connecting to DB:", process.env.DB_HOST, process.env.DB_PORT, process.env.DB_NAME);

const sequelize = new Sequelize(

  {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 5432,
    dialect: "postgres",
    logging: console.log
  }
);

export const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected!");

    await sequelize.sync({ force: true });
    console.log("✅ Tables created!");

  } catch (err) {
    console.error("DB connection error:", err);
  }

}

export default sequelize;