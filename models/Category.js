import sequelize from '../database/config.js'
import { DataTypes } from 'sequelize'

const Category = sequelize.define('category_model', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'category',
  timestamps: true,
});

export default Category