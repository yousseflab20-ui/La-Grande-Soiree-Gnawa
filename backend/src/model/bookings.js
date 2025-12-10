import { DataTypes, Sequelize } from "sequelize"
import db from "../config/db.js"

const booking = db.define("Booking",{
    id:{
        type:DataTypes.NUMBER,
        primaryKey:true,
        autoIncrement:true
    },
    Coode:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    customerName:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    customerEmail:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    artistId:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})
export default booking;