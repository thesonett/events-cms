import bcrypt from 'bcrypt'
import { Admin } from '../models/index.js'

// TODO: Admin authentication here!
async function createAdmin({admin_email, password, username, college_id}) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({admin_email, password: hashedPassword, username, college_id });

    if(!admin) {
        return {success: false, message: 'Admin creation falied'};
    }

    return { success: true, admin };
}

async function getAdmin({admin_email, password}) {
    const admin = await Admin.findOne({ where: { admin_email }, attributes: ['admin_email', 'username', 'password'] });

    if (!admin) 
        return {success: false, message: 'Admin not found'};

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) 
        return {success: false, message: 'Invalid password'};

    return { success: true, admin };
}

async function getAdminByEmail(admin_email) {
    const admin = await Admin.findOne({ where: { admin_email } });

    if (!admin) 
        return {success: false, message: 'Admin not found'};

    return { success: true, admin };
}

async function deleteAdminByEmail(admin_email) {
    const deletedCount = await Admin.destroy({ where: { admin_email: admin_email } });
    
    if(!deletedCount) {
        return {success: false, message: 'Admin not found'};
    }

    return { success: true }
}

export {
    createAdmin,
    getAdmin,
    getAdminByEmail,
    deleteAdminByEmail,
}