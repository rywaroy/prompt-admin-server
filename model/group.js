const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const GroupModel = sequelize.define('group', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    orderIndex: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    timestamps: true,
    underscored: true,
    tableName: 'group',
});

module.exports = GroupModel;
