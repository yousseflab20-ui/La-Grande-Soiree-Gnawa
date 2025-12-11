import {DataTypes} from "sequelize"
import db from "../config/db.js"

const atrist = db.define("Artists",{
    id :{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    photo:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type:DataTypes.TEXT
    }
},{
    tableName:"Artists",
    timestamps:true
}
)
export default atrist;