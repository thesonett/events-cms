import { OrganizingCommittee } from "../models/index.js";

async function getOrganizingCommitties() {
    const organizingCommitties = await OrganizingCommittee.findAll({ attributes: ['id', 'name'] })

    if(!organizingCommitties) {
        return {success: false, message: 'Organizing committies are not found!'};
    }

    return { success: true, organizingCommitties }
}

async function getOrganizingCommitteeById(id) {
    const { name }  = await OrganizingCommittee.findOne({ where: { id }, attributes: ['name'] });

    if(!name) {
        return {success: false, message: 'Organizing committiee name not found!'};
    }

    return {success: true, name};
}

export {
    getOrganizingCommitties,
    getOrganizingCommitteeById,
}