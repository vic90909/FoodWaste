import sequelize from "sequelize"
import db2 from "../dbConfig.js"
import db from "../dbConfigMySql.js";

const Group = db.define("Groups",
{
    GroupId:{
        type:sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    CreatorId:{
        type:sequelize.INTEGER,
        allowNull:false
    },
    GroupDescription:{
        type:sequelize.STRING,
        allowNull:false
    }
});

export default Group;