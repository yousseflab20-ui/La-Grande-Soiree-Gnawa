import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const Clinet = sequelize("clinet", {
    name: {
        type: DataTypes.STRING,

    }
})