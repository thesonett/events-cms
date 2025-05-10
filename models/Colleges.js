import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'

const Colleges = sequelize.define('College', {
  college_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  college_name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'colleges',
  timestamps: true,
});

export default Colleges