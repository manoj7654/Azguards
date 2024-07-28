const { DataTypes } = require('sequelize');
const { connection } = require('../config/db');

const Todo = connection.define('Todo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed'),
        default:"pending",
        allowNull: false,
    }
});

module.exports = Todo;
