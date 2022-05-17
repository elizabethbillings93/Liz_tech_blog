// Pull Sequelize
const Sequelize = require('sequelize');
// Pull in dotenv(which hides passwords) and configure
require ('dotenv').config();
// Create connection to the Database
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PW,
    {
        host:'localhost',
        dialect:'mysql',
        port:3306
    }
);
module.exports = sequelize;
