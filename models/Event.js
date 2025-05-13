import sequelize from '../database/database.js'
import { DataTypes } from 'sequelize'

const Event = sequelize.define('eventModel', {
    event_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    event_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    event_description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    event_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'events',
    timestamps: true
})

export default Event