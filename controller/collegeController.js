import { College } from "../models/index.js";

async function getColleges() {
    const colleges = await College.findAll({
        attributes: ['college_id', 'college_name']
    })

    if(!colleges) {
        return {success: false, message: 'Colleges not found!'};
    }

    return {success: true, colleges}
}

async function getCollegeNameById(college_id) {
    const {college_name} = await College.findOne({
        where: { college_id },
        attributes: ['college_name'],
    });

    if(!college_name) {
        return {success: false, message: 'College name not found!'};
    }

    return {success: true, college_name};
}

export {
    getColleges,
    getCollegeNameById
}