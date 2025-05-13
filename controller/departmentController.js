import { Department } from "../models/index.js";

async function getDepartments() {
    const departments = await Department.findAll({
        attributes: ['department_id', 'department_name']
    })

    if(!departments) {
        return {success: false, message: 'Departments not found!'};
    }

    return { success: true, departments }
}

async function getDepartmentNameById(department_id) {
    const { department_name } = await Department.findOne({
        where: { department_id },
        attributes: ['department_name'],
    });

    if(!department_name) {
        return {success: false, message: 'Department name not found!'};
    }

    return {success: true, department_name};
}

export {
    getDepartments,
    getDepartmentNameById,
}