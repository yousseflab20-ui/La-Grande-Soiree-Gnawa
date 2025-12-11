import { DataTypes } from "sequelize"
import db from "../config/db.js"

const booking = db.define("Booking", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Coode: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customerEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    artistId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}
    , {
        tableName: "Booking",
        timestamps: true
    })
export default booking;