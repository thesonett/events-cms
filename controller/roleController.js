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
        console.error('Exception occured inside createRole!\n', error)
        return { success: false, message: 'Exception:::: Role creation failed!' }
    }
}

async function deleteRoleById(id) {
    try {
        const role = await Role.destroy({ where: { id } })
        
        return role ? 
            { success: true, message: 'Role got deleted!' } : 
            { success: false, message: 'Role not found!' }
    }
    catch (error) {
        console.log('Exception occurred inside deleteRoleById!\n', error)
        return { success: false, message: 'Exception:::: Role not found!' }
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
        console.log('Exception occurred inside updateRoleById!\n', error)
        return { success: false, message: 'Exception::: Unable to update role!' }
    }
}

async function getRoles() {
  try {
    const roles = await Role.findAll({ attributes: ['id', 'role'] })
  
    if (roles.length === 0) {
      return { success: false, message: 'No roles found!' }
    }
  
    return { success: true, roles }
  }
  catch(error) {
    console.error('Exception occurred inside getRoles!\n', error)
    return { success: false, message: 'Exception:::: No roles found!' }
  }
}

async function getRoleNameById(id) {
  try {
    const roleData = await Role.findOne({ where: { id }, attributes: ['role'] })

    if (!roleData) {
      return { success: false, message: 'No role found!' }
    }

    return { success: true, role: roleData.role }

  }
  catch(error) {
    console.error('Exception occurred inside getRoleNameById!\n', error)
    return { success: false, message: 'Exception:::: No role found!' }
  }
}

export {
  createRole,
  deleteRoleById,
  updateRoleById,

  getRoles,
  getRoleNameById,
}
