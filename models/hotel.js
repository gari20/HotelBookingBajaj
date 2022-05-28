var dbConn=require("../config/db.config");
const { DataTypes } = require('sequelize');
const { Sequelize } = require('../Utils');

const HotelModel = Sequelize.define('hotels', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cityIdFk: {
        type: DataTypes.INTEGER,
        references: {
            model: 'cities',
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email:DataTypes.STRING,
    address : DataTypes.STRING,
    //roomAvail:DataTypes.INTEGER,
    
        
    
    //price: DataTypes.STRING,
    
    
});

module.exports = HotelModel;