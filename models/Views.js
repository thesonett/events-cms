import sequelize from '../database/config.js'
import { DataTypes } from 'sequelize'
import Posts from './Posts.js'

const Views = sequelize.define('views_model', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    views: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // foreign keys
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Posts,
            key: 'id'
        }
    }
}, 
{
  tableName: 'views',
  timestamps: true,
  underscored: true,
})

export default Views