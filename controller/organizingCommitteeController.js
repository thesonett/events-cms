import { OrganizingCommittee } from "../models/index.js";

async function getOrganizingCommitties() {
    try {
        const organizingCommitties = await OrganizingCommittee.findAll({ attributes: ['id', 'name'] })
    
        if(!organizingCommitties) {
            return {success: false, message: 'Organizing committies are not found!'};
        }
    
        return { success: true, organizingCommitties }
    }
    catch (error) {
        console.log(error)
        return { success: false, message: 'Exception occured inside getOrganizingCommitties!' }
    }
}

async function getOrganizingCommitteeById(id) {
    try {
        const oc = await OrganizingCommittee.findOne({ where: { id }, attributes: ['name'] });
    
        if (!oc) {
            return { success: false, message: 'Organizing committee not found!' };
        }
    
        return { success: true, name: oc.name };
    }
    catch (error) {
        console.log(error)
        return { success: false, message: 'Exception occured inside getOrganizingCommitteeById!' }
    }
}


export {
    getOrganizingCommitties,
    getOrganizingCommitteeById,
}