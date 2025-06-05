import { OrganizingCommittee } from "../models/index.js"

async function createOrganizingCommittee({ name }) {
    try {
        const organizingCommittee = await OrganizingCommittee.create({ name })
        if(!organizingCommittee) {
            return { success: false, message: 'Organizing Committee creation failed!' }
        }

        return { success: true, message: 'Organizing Committee got created!', organizingCommittee }
    }
    catch(error) {
        console.log('Exception occurred inside createOrganizingCommittee!\n', error)
        return { success: false, message: 'Exception::: Organizing Committee creation failed!' }
    }
}

async function deleteOrganizingCommitteeById(id) {
    try {
        const organizingCommittee = await OrganizingCommittee.destroy({ where: { id } })
        
        return organizingCommittee ? 
            { success: true, message: 'Organizing Committee got deleted!'} : 
            { success: false, message: 'Organizing Committee not found!'}
    }
    catch (error) {
        console.log('Exception occurred inside deleteOrganizingCommitteeById!\n', error)
        return { success: false, message: 'Exception::: Organizing Committee not found!' }
    }
}

async function updateOrganizingCommitteeById(id, updates) {
    try {
        const [status] = await OrganizingCommittee.update(updates, { where: { id } })
    
        if (!status) {
            return { success: false, message: 'Organizing Committee not found or no changes made!' }
        }
    
        const updatedOrganizingCommittee = await OrganizingCommittee.findByPk(id)
        return { success: true, message: 'Organizing Committee got updated!', updatedOrganizingCommittee }
    }
    catch (error) {
        console.log('Exception occurred inside updateOrganizingCommitteeById!\n', error)
        return { success: false, message: 'Exception::: Organizing Committee not found or no changes made!' }
    }
}

async function getOrganizingCommittees() {
    try {
        const organizingCommitties = await OrganizingCommittee.findAll({ attributes: ['id', 'name'] })
    
        if(!organizingCommitties) {
            return {success: false, message: 'Organizing committies are not found!'}
        }
    
        return { success: true, organizingCommitties }
    }
    catch (error) {
        console.log('Exception occurred inside getOrganizingCommitties!\n', error)
        return { success: false, message: 'Exception::: Organizing committies are not found!'}
    }
}

async function getOrganizingCommitteeById(id) {
    try {
        const oc = await OrganizingCommittee.findOne({ where: { id }, attributes: ['name'] })
    
        if (!oc) {
            return { success: false, message: 'Organizing committee not found!' }
        }
    
        return { success: true, name: oc.name }
    }
    catch (error) {
        console.log('Exception occurred inside getOrganizingCommitteeById!\n', error)
        return { success: false, message: 'Exception::: Organizing committee not found!' }
    }
}


export {
    createOrganizingCommittee,
    deleteOrganizingCommitteeById,
    updateOrganizingCommitteeById,

    getOrganizingCommittees,
    getOrganizingCommitteeById,
}