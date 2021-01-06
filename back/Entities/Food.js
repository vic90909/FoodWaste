import db2 from '../dbConfig.js'
import db from "../dbConfigMySql.js";
import Sequelize from 'sequelize'

const Food = db.define("Food",{
    FoodId:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    FoodName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    FoodExpirationDate:{
        type:Sequelize.DATE,
        allowNull:false
    },
    FoodType:{
        type:Sequelize.STRING,
        allowNull:false
    },
    FoodQuantity:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Available:{
        type:Sequelize.STRING,
        allowNull:true
    },
    UserId:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
});

export default Food;