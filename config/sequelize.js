const Sequelize = require('sequelize');

const sequelize = new Sequelize('prompt', process.env.MYSQL_ACCOUNT, process.env.MYSQL_PASSWORD, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
