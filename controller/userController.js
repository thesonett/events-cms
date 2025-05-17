import bcrypt from 'bcrypt'
import { Users } from '../models/index.js'

async function createUser({ first_name, last_name, email, password, username, status, email_verified_at,  is_owner, organizing_committee_id, role_id}) {
    if (password.length < 8) {
        return { success: false, message: 'Password must be at least 8 characters long' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({first_name, last_name, email, password: hashedPassword, username, status, email_verified_at,  is_owner, organizing_committee_id, role_id});

    if(!user) {
        return {success: false, message: 'User creation failed'};
    }

    return { success: true, user };
}

async function getUser({email, password}) {
    const user = await Users.findOne({ where: { email, is_owner: true, status: 1 } });

    if (!user) 
        return {success: false, message: 'User not found'};

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) 
        return {success: false, message: 'Invalid password'};


    return { success: true, user };
}

async function getUsersByRoleId(role_id) {
    const users = await Users.findAll({
        where: { role_id, is_owner: true, status: 1 },
        attributes: { exclude: ['password'] },
    });

    if (!users || users.length === 0) 
        return { success: false, message: 'Users not found' };

    return { success: true, users };
}

async function getUserById(id) {
    const user = await Users.findOne({ where: { id, is_owner: true, status: 1 }, attributes: { exclude: ['password'] }, });

    if (!user) 
        return {success: false, message: 'User not found'};

    return { success: true, user };
}

async function deleteUserById(id) {
    const user = await Users.destroy({ where: { id } });
    
    if(!user) {
        return {success: false, message: 'User not found'};
    }

    return { success: true, message: 'User got deleted!'}
}

export {
    createUser,
    getUser,
    getUsersByRoleId,
    getUserById,
    deleteUserById,
}