import { DataTypes } from "sequelize"
import db from "../config/db.js"
import artist from "./artist.js"

const booking = db.define("Booking", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Code: {
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
        tableName: "bookings",
        timestamps: true
    })
booking.belongsTo(artist, { foreignKey: "artistId" });
export default booking;