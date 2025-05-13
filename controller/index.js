import { getColleges, getCollegeNameById } from './collegeController.js'
import { createDB } from './dbController.js'
import { createUser, getUser, getUserById, deleteUserById } from './userController.js'

export {
    createUser,
    getUser,
    getUserById,
    deleteUserById,
    
    getColleges,
    getCollegeNameById,
    createDB,
}