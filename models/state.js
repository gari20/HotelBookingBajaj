var dbConn=require("../config/db.config");
const { DataTypes } = require('sequelize');
const { Sequelize } = require('../Utils');

const StateModel = Sequelize.define('states', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name:DataTypes.STRING,
    
    
});

module.exports = StateModel;