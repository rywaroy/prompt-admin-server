const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const PromptFragmentModel = sequelize.define('prompt_fragment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    selected: {
        type: DataTypes.INTEGER,
        allowNull: false,
        get() {
            const selected = this.getDataValue('selected');
            return !!selected;
        },
        set(value) {
            this.setDataValue('selected', value ? 1 : 0);
        },
    },
    orderIndex: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: true,
    underscored: true,
    tableName: 'prompt_fragment',
});

module.exports = PromptFragmentModel;
