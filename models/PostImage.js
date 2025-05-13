import sequelize from '../database/database.js'
import { DataTypes } from 'sequelize'
import Post from './Post.js'

const PostImage = sequelize.define('postImage', {
  image_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  image_url: {
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
  tableName: 'postImages',
  timestamps: true,
})

export default PostImage
