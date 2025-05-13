import bcrypt from 'bcrypt'
import { User } from '../models/index.js'

async function createUser({user_email, password, username, college_id}) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({user_email, password: hashedPassword, username, college_id });

    if(!user) {
        return {success: false, message: 'User creation failed'};
    }

    return { success: true, user };
}

async function getUser({user_email, password}) {
    const user = await User.findOne({ where: { user_email }, attributes: ['user_id', 'user_email', 'username', 'password'] });

    if (!user) 
        return {success: false, message: 'User not found'};

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) 
        return {success: false, message: 'Invalid password'};


    const { password: _, ...safeUser } = user.get({ plain: true });
    return { success: true, user: safeUser };
}

async function getUserById(user_id) {
    const user = await User.findOne({ where: { user_id }, attributes: { exclude: ['password'] }, });

    if (!user) 
        return {success: false, message: 'User not found'};

    return { success: true, user };
}

async function deleteUserById(user_id) {
    const status = await User.destroy({ where: { user_id: user_id } });
    
    if(!status) {
        return {success: false, message: 'User not found'};
    }

    return { success: true }
}

export {
    createUser,
    getUser,
    getUserById,
    deleteUserById,
}