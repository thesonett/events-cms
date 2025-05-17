import sequelize from '../database/config.js'
import { DataTypes } from 'sequelize'

const OrganizingCommittee = sequelize.define('organizing_committee_model', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'organizing_committee',
  timestamps: true,
});

export default OrganizingCommittee