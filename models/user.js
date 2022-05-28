var dbConn=require("../config/db.config");
const { DataTypes } = require('sequelize');
const { Sequelize } = require('../Utils');

const UserModel = Sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userType: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName:DataTypes.STRING,
    phone: DataTypes.STRING,
    email:DataTypes.STRING,
    password: DataTypes.STRING,
    status:{ type:DataTypes.STRING,
    defaultValue:"Active"
    }
    
});

module.exports = UserModel;