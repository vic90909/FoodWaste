import db2 from '../dbConfig.js'
import Sequelize from 'sequelize'
import db from "../dbConfigMySql.js"

const User= db.define("Users",
    {
        UserId:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull: false
        },

        UserName:{
            type: Sequelize.STRING,
            allowNull: false
        },

        UserSurname:{
            type: Sequelize.STRING,
            allowNull: false
        },
        UserAge:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        UserEmail:{
            type: Sequelize.STRING,
            allowNull: false
        },
        UserPhone:{
            type: Sequelize.STRING,
            allowNull: false
        },
        UserAdress:{
            type: Sequelize.STRING,
            allowNull: false
        },
        UserPass:{
            type:Sequelize.STRING,
            allowNull:false,
        }
    });

export default User;