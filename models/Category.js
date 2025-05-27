import sequelize from '../database/config.js'
import { DataTypes } from 'sequelize'

const Category = sequelize.define('category_model', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(255),
    allowNull: false,
  }
}, 
{
  indexes: [
    {
      unique: true,
      fields: ['id'],
      name: 'unique_category_id',
    }
  ],
  tableName: 'category',
  timestamps: true,
})

export default Category