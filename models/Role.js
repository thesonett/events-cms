import sequelize from '../database/config.js'
import { DataTypes } from 'sequelize'
import Users from './Users.js'

const Role = sequelize.define('role_model', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // foreign keys
  users_id: {
    type: DataTypes.INTEGER,
    references: {
        model: Users,
        key: 'id'
    }
  },
  users_organizing_committee_id: {
    type: DataTypes.INTEGER,
    references: {
        model: Users,
        key: 'organizing_committee_id'
    }
  },
}, {
  tableName: 'role',
  timestamps: true,
});

export default Role