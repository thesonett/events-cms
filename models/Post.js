import sequelize from '../database/database.js'
import { DataTypes } from 'sequelize'
import College from './College.js'
import Admin from './Admin.js'

const Post = sequelize.define('post', {
  post_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  venue: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Foreign keys
  college_id: {
    type: DataTypes.INTEGER,
    references: {
        model: College,
        key: 'college_id',
    }
  },
  admin_email: {
    type: DataTypes.STRING,
    references: {
        model: Admin,
        key: 'admin_email',
    }
  },
}, {
  tableName: 'posts',
  timestamps: true,
});

export default Post