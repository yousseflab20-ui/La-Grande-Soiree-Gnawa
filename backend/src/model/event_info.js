import { DataTypes } from "sequelize";
import db from "../config/db.js"

const eventRoute = db.define("Event_Info", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    banner_url: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "Event_Info",
    timestamps: true
})
export default eventRoute;