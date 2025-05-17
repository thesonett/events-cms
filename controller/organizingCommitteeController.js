import { OrganizingCommittee } from "../models/index.js";

async function getOrganizingCommitties() {
    const organizingCommitties = await OrganizingCommittee.findAll({ attributes: ['id', 'name'] })

    if(!organizingCommitties) {
        return {success: false, message: 'Organizing committies are not found!'};
    }

    return { success: true, organizingCommitties }
}

async function getOrganizingCommitteeById(id) {
    const oc = await OrganizingCommittee.findOne({ where: { id }, attributes: ['name'] });

    if (!oc) {
        return { success: false, message: 'Organizing committee not found!' };
    }

    return { success: true, name: oc.name };
}


export {
    getOrganizingCommitties,
    getOrganizingCommitteeById,
}