const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: "8889",

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});


//notre base de données
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Definir les tables de la base de données

db.user = require("../models/user.model")(sequelize, Sequelize);

module.exports = db;