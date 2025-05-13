import sequelize from '../database/database.js'
import { DataTypes } from 'sequelize'

const Event = sequelize.define('eventModel', {
    event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
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
    tableName: 'event',
    timestamps: true
})

export default Event