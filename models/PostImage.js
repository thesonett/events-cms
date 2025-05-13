import sequelize from '../database/database.js'
import { DataTypes } from 'sequelize'
import Post from './Post.js'

const PostImage = sequelize.define('postImageModel', {
  post_image_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  post_image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // foreign keys
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Post,
      key: 'post_id',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'postImage',
  timestamps: true,
})

export default PostImage
