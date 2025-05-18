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

async function getUsers() {
    const users = await Users.findAll({ attributes: { exclude: ['password'] } })

    if (!users || users.length === 0) 
        return { success: false, message: 'Users not found' };

    return { success: true, users };
}

async function getUserByRoleId(role_id) {
    const user = await Users.findOne({
        where: { role_id, is_owner: true, status: 1 },
        attributes: { exclude: ['password'] },
    });

    if (!user) 
        return { success: false, message: 'User not found' };

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

async function getUsersById(id) {
    const users = await Users.findAll({ where: { id, is_owner: true }, attributes: { exclude: ['password'] } })

    if (!users || users.length === 0) 
        return { success: false, message: 'Users not found' };

    return { success: true, users };
}


async function deleteUserById(id) {
    const user = await Users.destroy({ where: { id } });
    
    if(!user) {
        return {success: false, message: 'User not found'};
    }

    return { success: true, message: 'User got deleted!'}
}


async function updateUserById(id, updates) {
    if (updates.password && updates.password.length < 8) {
        return { success: false, message: 'Password must be at least 8 characters long' };
    }

    if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10);
    }

    const [affectedRows] = await Users.update(updates, { where: { id } });

    if (!affectedRows) {
        return { success: false, message: 'User not found or no changes made' };
    }

    const updatedUser = await Users.findByPk(id);
    console.log(updatedUser)
    
    return { success: true, message: 'User got updated!' };
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
    getUsersById,
}