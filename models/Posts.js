import sequelize from '../database/config.js'
import { DataTypes } from 'sequelize'
import Events from './Events.js'

const Posts = sequelize.define('posts_model', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  venue: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  organizer: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('upcoming', 'ongoing', 'completed'),
    defaultValue: 'upcoming'
  },
  time: {
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW
  },
  date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
  },
  // Foreign keys
  event_id: {
    type: DataTypes.INTEGER,
    references: {
        model: Events,
        key: 'id',
    }
  },
}, 
{
  indexes: [
    {
      unique: true,
      fields: ['title'],
      name: 'unique_post_title_id',
    },
  ],
  tableName: 'posts',
  timestamps: true,
});

export default Posts