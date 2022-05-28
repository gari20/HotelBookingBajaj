const { DataTypes } = require('sequelize');
const { Sequelize } = require('../Utils');


const BillModel = Sequelize.define('bills', {
    id: {
        type: DataTypes.INTEGER,
        
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: "users",
            key: 'id'
        }
    },
    hotelId:{
        type:DataTypes.INTEGER,
        references:{
            model:"hotels",
            key:"id"
        }
    },
    roomId:{
        type:DataTypes.INTEGER,
        references:{
            model:"rooms",
            key:"id"
        }
    },
    billNumber:DataTypes.INTEGER,
    roomNo:DataTypes.INTEGER,
    roomPrice:DataTypes.INTEGER,
    
    payingMethod:DataTypes.STRING,
    status:DataTypes.STRING
    
    
});

module.exports = BillModel;