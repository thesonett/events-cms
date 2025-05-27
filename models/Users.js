import sequelize from '../database/config.js'
import { DataTypes } from 'sequelize'
import OrganizingCommittee from './OrganizingCommittee.js'
import Role from './Role.js'

const Users = sequelize.define('users_model', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  email_verified_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  is_owner: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  // foreign keys
  organizing_committee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: OrganizingCommittee,
      key: 'id',
    },
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: 'id',
    },
  },
},
// indexes
{
  indexes: [
    {
      unique: true,
      fields: ['email'],
      name: 'unique_email_id',
    },
    {
      unique: true,
      fields: ['username'],
      name: 'unique_username_id',
    },
  ],

  tableName: 'users',
  timestamps: true,
})

export default Users
