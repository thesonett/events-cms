import { Role } from '../models/index.js';

async function createRole({ role }) {
    try {
        const status = await Role.create({ role })
        if(!status) {
            return { success: false, message: 'Role creation falied!' }
        }

        return { success: true, message: 'Role got created!', role: status }
    }
    catch(error) {
        console.error('Role creation failed!\n', error)
        return { success: false, message: 'Exception occured inside createRole!' }
    }
}

async function deleteRoleById(id) {
    try {
        const role = await Role.destroy({ where: { id } })
        
        return role ? 
            { success: true, message: 'Role got deleted!'} : 
            { success: false, message: 'Role not found!'}
    }
    catch (error) {
        console.log(error)
        return { success: false, message: 'Exception occured inside deleteRoleById!' }
    }
}

async function updateRoleById(id, updates) {
    try {
        const [status] = await Role.update(updates, { where: { id } })
    
        if (!status) {
            return { success: false, message: 'Role not found or no changes made!' }
        }
    
        const updatedRole = await Role.findByPk(id)
        return { success: true, message: 'Role got updated!', updatedRole }
    }
    catch (error) {
        console.log(error)
        return { success: false, message: 'Exception occured inside updateRoleById!' }
    }
}

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
    const roleData = await Role.findOne({ where: { id }, attributes: ['role'] })

    if (!roleData) {
      return { success: false, message: 'No role found!' }
    }

    return { success: true, role: roleData.role }

  }
  catch(error) {
    console.error(error)
    return { success: false, message: 'Exception occurred inside getRoleById!' }
  }
}

export {
  createRole,
  deleteRoleById,
  updateRoleById,

  getRoles,
  getRoleById,
}
