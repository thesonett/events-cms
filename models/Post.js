import sequelize from '../database/database.js'
import { DataTypes } from 'sequelize'
import Event from './Event.js'

const Post = sequelize.define('postModel', {
  post_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  post_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  post_description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  post_venue: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Foreign keys
  event_id: {
    type: DataTypes.INTEGER,
    references: {
        model: Event,
        key: 'event_id',
    }
  },
}, {
  tableName: 'post',
  timestamps: true,
});

export default Post