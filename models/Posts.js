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
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  venue: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  organizer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('upcoming', 'ongoing', 'completed', 'cancelled', 'postponed'),
    defaultValue: 'upcoming'
  },
  start: {
      type: DataTypes.TIME,
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
}, {
  tableName: 'posts',
  timestamps: true,
});

export default Posts