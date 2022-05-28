var dbConn=require("../config/db.config");
const { DataTypes } = require('sequelize');
const { Sequelize } = require('../Utils');

const CityModel = Sequelize.define('cities', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    stateIdFk: {
        type: DataTypes.INTEGER,
        references: {
            model: "states",
            key: 'id'
        }
    },
    name:DataTypes.STRING,
    
    
});

module.exports = CityModel;