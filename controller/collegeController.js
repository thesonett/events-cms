import { College } from "../models/index.js";

async function getColleges() {
    return await College.findAll({
        attributes: ['college_id', 'college_name']
    })
}

async function getCollegeNameById(college_id) {
    const college = await College.findOne({
        where: { college_id },
        attributes: ['college_name'],
    });

    return college.college_name;
}

export {
    getColleges,
    getCollegeNameById
}