import sequelize from '../database/config.js'
import { DataTypes } from 'sequelize'

const Images = sequelize.define('images_model', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  file_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  original_filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING,
  },
  entity_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  entity_type: {
    type: DataTypes.ENUM('post', 'event'),
    defaultValue: 'event'
  },
  // foreign keys
  
}, {
  tableName: 'images',
  timestamps: true,
})

export default Images
