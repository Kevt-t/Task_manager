import { DataTypes } from 'sequelize';
import sequelizeConnection from '../config/config.js';

const Task = sequelizeConnection.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt columns
});

export default Task;
