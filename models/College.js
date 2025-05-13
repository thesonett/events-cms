import sequelize from '../database/database.js'
import { DataTypes } from 'sequelize'

const College = sequelize.define('collegeModel', {
  college_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  college_name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'colleges',
  timestamps: true,
});

export default College