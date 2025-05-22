import sequelize from '../database/config.js'
import { DataTypes } from 'sequelize'
import OrganizingCommittee from './OrganizingCommittee.js'
import Category from './Category.js'
import Role from './Role.js'

const Events = sequelize.define('events_model', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    // foreign keys
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id'
        }
    },
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
        references: {
          model: Role,
          key: 'id',
        },
      },
}, {
    tableName: 'events',
    timestamps: true
})

export default Events