import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Admin = db.define("Admin", {
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Admin;
