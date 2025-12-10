import {DataTypes} from "sequelize"
import db from "../config/db"

const User = db.define("artists ",{
    id :{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    paassword:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    tableName:"artists",
    timestamps:true
}
)
export default artists;