const Sequelize = require('sequelize');
const Config = require('../config/db.config')

const sequelize = new Sequelize(Config.sqlDb.dbName, Config.sqlDb.dbUser, Config.sqlDb.dbPassword, {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 100
    },
    define: {
        freezeTableName: true,
        timestamps: false
    }
});

module.exports = sequelize;