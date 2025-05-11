import bcrypt from 'bcrypt'
import { Admin } from '../models/index.js'

// TODO: Admin authentication here!
async function createAdmin({username, password, college_id}) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await Admin.create({ username, password: hashedPassword, college_id });
}

async function getAdmin({username, password}) {
    const admin = await Admin.findOne({ where: { username }, attributes: ['admin_id', 'username', 'password'] });

    if (!admin) 
        return null;

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) 
        return null;

    return admin;
}

async function getAdminById(admin_id) {
    const admin = await Admin.findOne({ where: { admin_id } });

    if (!admin) 
        return null;

    return admin;
}

export {
    createAdmin,
    getAdmin,
    getAdminById,
}