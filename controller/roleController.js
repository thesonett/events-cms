import { Role } from '../models/index.js';

async function getRoles() {
  const roles = await Role.findAll({ attributes: ['id', 'role'] });

  if (roles.length === 0) {
    return { success: false, message: 'No roles found!' };
  }

  return { success: true, roles };
}

async function getRoleById(id) {
  const { role } = await Role.findOne({ where: { id }, attributes: ['role'] });

  if (!role) {
    return { success: false, message: 'No role found!' };
  }

  return { success: true, role };
}

export {
  getRoles,
  getRoleById,
}
