import sequelize from '../database/database.js'
import { DataTypes } from 'sequelize'
import College from './College.js';

const User = sequelize.define('userModel', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_email: {
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
  tableName: 'users',
  timestamps: true,
});

export default User