import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Event = sequelize.define("Event", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
    },
}, {
    tableName: "Events",
    timestamps: true
});

export default Event;