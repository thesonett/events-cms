import sequelize from '../database/database.js'
import { DataTypes } from 'sequelize'
import College from './College.js'
import Department from './Department.js'

const Student = sequelize.define('studentModel', {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rollNo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
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
  department_id: {
    type: DataTypes.INTEGER,
    references: {
        model: Department,
        key: 'department_id',
    }
  },
}, {
  tableName: 'student',
  timestamps: true,
});

export default Student