import db from '../dbConfig.js'
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
    UserId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
});

export default Food;