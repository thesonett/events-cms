import sequelize from '../database/config.js'
import { DataTypes } from 'sequelize'
import Users from './Users.js'

const Role = sequelize.define('role_model', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user'
  },
}, {
  tableName: 'role',
  timestamps: true,
});

export default Role