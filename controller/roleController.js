import { Role } from '../models/index.js';

async function getRoles() {
  try {
    const roles = await Role.findAll({ attributes: ['id', 'role'] });
  
    if (roles.length === 0) {
      return { success: false, message: 'No roles found!' };
    }
  
    return { success: true, roles };
  }
  catch(error) {
    console.error(error)
    return { success: false, message: 'Exception occurred inside getRoles!' }
  }
}

async function getRoleById(id) {
  try {
    const { role } = await Role.findOne({ where: { id }, attributes: ['role'] });
  
    if (!role) {
      return { success: false, message: 'No role found!' };
    }
  
    return { success: true, role };
  }
  catch(error) {
    console.error(error)
    return { success: false, message: 'Exception occurred inside getRoleById!' }
  }
}

export {
  getRoles,
  getRoleById,
}
