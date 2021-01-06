import sequelize from 'sequelize'
import db2 from '../dbConfig.js'
import db from "../dbConfigMySql.js";

const GroupUsers=db.define("GroupsUsers",{
    GroupsUsersId:{
        type:sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    UserId:{
        type:sequelize.INTEGER,
        allowNull:false,
    },
    GroupId:{
        type:sequelize.INTEGER,
        allowNull:false
    }

});

export default GroupUsers;