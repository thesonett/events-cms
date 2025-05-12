import sequelize from '../database/database.js'
import { DataTypes } from 'sequelize'
import College from './College.js';

const Admin = sequelize.define('admin', {
  admin_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  admin_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
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