import sequelize from '../database/config.js'
import { DataTypes } from 'sequelize'
import Users from './Users.js'

const Activities = sequelize.define('activities_model', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  actions: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  actionsPerformedOn: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  // foreign keys
   user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id',
    },
  },
}, {
  tableName: 'activities',
  timestamps: true,
})

export default Activities