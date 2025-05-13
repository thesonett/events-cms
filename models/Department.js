import sequelize from '../database/database.js'
import { DataTypes } from 'sequelize'

const Department = sequelize.define('department', {
  department_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  department_name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'departments',
  timestamps: true,
});

export default Department