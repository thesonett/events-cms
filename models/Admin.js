import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'
import College from './College.js';

const Admin = sequelize.define('admin', {
  admin_email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  college_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: College,
      key: 'college_id',
    },
  },
}, {
  tableName: 'admins',
  timestamps: true,
});

export default Admin