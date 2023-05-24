const Sequelize = require('sequelize');

const sequelize = new Sequelize('prompt', 'zzh', '123456', {
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