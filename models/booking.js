const { DataTypes } = require('sequelize');
const { Sequelize } = require('../Utils');


const BookingModel = Sequelize.define('bookings', {
    booking_id: {
        type: DataTypes.INTEGER,
        
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "users",
            key: 'id'
        }
    },
    hotel_id:{
        type:DataTypes.INTEGER,
        references:{
            model:"hotels",
            key:"id"
        }
    },
    room_id:{
        type:DataTypes.INTEGER,
        references:{
            model:"rooms",
            key:"id"
        }
    },
    roomAvail:DataTypes.INTEGER
    
    
});

module.exports = BookingModel;