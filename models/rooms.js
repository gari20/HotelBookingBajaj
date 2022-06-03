const { DataTypes } = require('sequelize');
const { Sequelize } = require('../Utils');


const RoomModel = Sequelize.define('rooms', {
    id: {
        type: DataTypes.INTEGER,
        
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
   hotelId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'hotels',
            key: 'id'
        }
    },
    roomType:DataTypes.STRING,
    bedType:DataTypes.STRING,
    roomPrice:DataTypes.INTEGER,
    roomAval:DataTypes.INTEGER
    
    
});

module.exports = RoomModel;