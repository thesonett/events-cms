import bcrypt from 'bcrypt'
import { Users } from '../models/index.js'

async function createUser({ first_name, last_name, email, password, username, status, email_verified_at,  is_owner, organizing_committee_id, role_id}) {
    if (password.length < 8) {
        return { success: false, message: 'Password must be at least 8 characters long' }
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
    
        const user = await Users.create({
            first_name, 
            last_name, 
            email, 
            password: hashedPassword, 
            username, 
            status, 
            email_verified_at,  
            is_owner, 
            organizing_committee_id, 
            role_id
        })
    
        if(!user) {
            return { success: false, message: 'User creation failed' }
        }
    
        return { success: true, message: 'Registration successful!', user }
    }
    catch(error) {
        console.error('User creation failed!\n', error)
        return { success: false, message: 'Unable to create user!'}
    }
}

async function getUser({email, password}) {
    try {
        const user = await Users.findOne({ where: { email, is_owner: true, status: 1 } })
    
        if (!user) 
            return { success: false, message: 'User not found!' }
    
        const isMatch = await bcrypt.compare(password, user.password)
        return isMatch ? { success: true, user } : {success: false, message: 'Invalid password'}
    }
    catch (error) {
        console.log(error)
        return { success: false, message: 'Exception occurred inside getUser!' }
    }
}

async function getUsers() {
    try {
        const users = await Users.findAll()
    
        if (!users || !users.length) 
            return { success: false, message: 'Users not found' }
    
        return { success: true, users }
    }
    catch (error) {
        console.log(error)
        return { success: false, message: 'Exception occured inside getUsers!' }
    }
}

async function getUserByRoleId(role_id) {
    try {
        const user = await Users.findOne({ where: { role_id, is_owner: true, status: 1 } })
        return user ? 
            { success: true, user } : 
            { success: false, message: 'User not found' }
    }
    catch (error) {
        console.log(error)
        return { success: false, message: 'Exception occured inside getUserByRoleId!' }
    }
}

async function getUsersByRoleId(role_id) {
    try {
        const users = await Users.findAll({ where: { role_id, is_owner: true, status: 1 } })
    
        return (!users || !users.length) ? 
            { success: false, message: 'Users not found' } :
            { success: true, users }
    }
    catch (error) {
        console.log(error)
        return { success: false, message: 'Exception occured inside getUsersByRoleId!' }
    }
}

async function getUserById(id) {
    try {
        const user = await Users.findOne({ where: { id, is_owner: true, status: 1 } })
        return user ? { success: true, user } : { success: false, message: 'User not found' }
    }
    catch (error) {
        console.log(error)
        return { success: false, message: 'Exception occured inside getUserById!' }
    }
}

async function deleteUserById(id) {
    try {
        const user = await Users.destroy({ where: { id } })
        
        return user ? 
            { success: true, message: 'User got deleted!' } : 
            { success: false, message: 'User not found!' }
    }
    catch (error) {
        console.log(error)
        return { success: false, message: 'Exception occured inside deleteUserById!' }
    }
}

async function updateUserById(id, updates) {
    if (updates.password) {
        if (updates.password.length < 8) {
            return { success: false, message: 'Password must be at least 8 characters long' }
        }

        updates.password = await bcrypt.hash(updates.password, 10)
    }

    try {
        const [status] = await Users.update(updates, { where: { id } })
    
        if (!status) {
            return { success: false, message: 'User not found or no changes made!' }
        }
    
        const updatedUser = await Users.findByPk(id)
        return { success: true, message: 'User got updated!',  updatedUser }
    }
    catch (error) {
        console.log(error)
        return { success: false, message: 'Exception occured inside updateUserById!' }
    }
}


export {
    createUser,
    deleteUserById,
    updateUserById,

    getUser,
    getUsers,

    getUserByRoleId,
    getUsersByRoleId,

    getUserById,
}