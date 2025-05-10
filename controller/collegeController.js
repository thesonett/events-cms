import College from "../models/College.js";

async function getAllColleges() {
    const colleges = await College.findAll({
        attributes: ['college_id', 'college_name']
    })
    return colleges
}



export {
    getAllColleges,
}