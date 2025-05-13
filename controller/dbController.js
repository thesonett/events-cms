import sequelize from '../database/database.js'
import { College, Student, Department, User, Post, PostImage, Event } from '../models/index.js'

// initializing relationships
College.hasMany(Student, { foreignKey: 'college_id', });
Student.belongsTo(College, { foreignKey: 'college_id', });
Department.hasMany(Student, { foreignKey: 'department_id', });
Student.belongsTo(Department, { foreignKey: 'department_id', });
College.hasOne(User, { foreignKey: 'college_id', });
User.belongsTo(College, { foreignKey: 'college_id', });
Event.hasMany(Post, { foreignKey: 'event_id', });
Post.belongsTo(Event, { foreignKey: 'event_id', });
Post.hasMany(PostImage, { foreignKey: 'post_id', onDelete: 'CASCADE', });
PostImage.belongsTo(Post, { foreignKey: 'post_id', });

// creating db tables
async function createDB() {
    await sequelize.sync({force: true})
    .then(async () => {
        await College.bulkCreate([
            { college_id: 101, college_name: 'IIT Kharagpur' },
            { college_id: 102, college_name: 'IIT Bombay' },
            { college_id: 103, college_name: 'IIT Delhi' },
            { college_id: 104, college_name: 'Jadavpur University' },
            { college_id: 105, college_name: 'MAKAUT' },
            { college_id: 106, college_name: 'AIIMS Delhi' },
            { college_id: 107, college_name: 'NIT Durgapur' },
        ], {ignoreDuplicates: true});

        await Department.bulkCreate([
            { department_id: 10, department_name: 'CSE' },
            { department_id: 20, department_name: 'ME' },
            { department_id: 30, department_name: 'ECE' },
            { department_id: 40, department_name: 'CE' },
            { department_id: 50, department_name: 'IT' },
        ]);

        await Student.bulkCreate([
            {name: 'Sonett', rollNo: 101001, email: 'sonettjsaha@gmail.com',college_id: 101,department_id: 10},
            {name: 'Joy', rollNo: 102002, email: 'joys0178000@gmail.com', college_id: 101, department_id: 20},
        ]);
    })
    .catch((error) => {
        console.error(error)
    })
}

export {
    createDB,
}