import {getColleges, getCollegeNameById} from './collegeController.js'
import {createAdmin, getAdmin, getAdminByEmail, deleteAdminByEmail} from './adminController.js'
import { createDB } from './dbController.js'

export {
    createAdmin,
    getColleges,
    getCollegeNameById,
    getAdmin,
    getAdminByEmail,
    deleteAdminByEmail,
    createDB,
}