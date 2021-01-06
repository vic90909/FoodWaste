import db2 from '../dbConfig.js'
import sequelize from 'sequelize'
import db from "../dbConfigMySql.js";

const Friends = db.define('Friends',{

    FriendsId:{
        type: sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    UserFriendId:{
        type:sequelize.INTEGER,
        allowNull:false,
    },
    UserId:{
        type:sequelize.INTEGER,
        allowNull:false,
    }
})

export default Friends;
