import sequelize from '../config/database.js'
import { College, Admin, Post, PostImage, Student } from '../models/index.js'

// initializing relationships
College.hasOne(Admin, { foreignKey: 'college_id', onDelete: 'CASCADE',});
College.hasMany(Student, { foreignKey: 'college_id' });
College.hasMany(Post, { foreignKey: 'college_id' });
Admin.hasMany(Post, { foreignKey: 'admin_email' });

Post.belongsTo(Admin, { foreignKey: 'admin_email' });
Post.hasMany(PostImage, { foreignKey: 'post_id', onDelete: 'CASCADE' });
PostImage.belongsTo(Post, { foreignKey: 'post_id' });

Post.belongsTo(College, { foreignKey: 'college_id' });
Student.belongsTo(College, { foreignKey: 'college_id' });
Admin.belongsTo(College, { foreignKey: 'college_id' });

// creating & inserting some dummy values into tables
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
        ]);

        await Student.bulkCreate([
            {
                name: 'Sonett',
                rollNo: 101001,
                email: 'sonettjsaha@gmail.com',
                department: 'CSE',
                isAlumni: false,
                college_id: 101
            },
            {
                name: 'Joy',
                rollNo: 102002,
                email: 'joys0178000@gmail.com',
                department: 'ME',
                isAlumni: true,
                college_id: 102
            },
            {
                name: 'Jhantu',
                rollNo: 103003,
                email: 'jhantusaha9836@gmail.com',
                department: 'ECE',
                isAlumni: false,
                college_id: 102
            },
            {
                name: 'Priya',
                rollNo: 104004,
                email: 'jhantusaha6545@gmail.com',
                department: 'CE',
                isAlumni: true,
                college_id: 101
            }
        ]);

        await Admin.create({ 
            admin_email: 'admin@gmail.com', 
            password: 'admin', 
            username: 'admin',
            college_id: 104
        });

        await Post.bulkCreate([
            {
                title: 'Tech Fest 2025',
                description: 'Annual tech festival featuring hackathons, robotics, and coding competitions.',
                venue: 'Main Auditorium',
                eventDate: new Date('2025-07-15'),
                category: 'Technical',
                college_id: 101,
                admin_email: 'admin@gmail.com',
            },
            {
                title: 'Startup Pitch Day',
                description: 'Students pitch their startup ideas to a panel of investors.',
                venue: 'Innovation Hub',
                eventDate: new Date('2025-08-01T14:00:00'),
                category: 'Entrepreneurship',
                college_id: 101,
                admin_email: 'admin@gmail.com',
            },
        ]);

        await PostImage.bulkCreate([
            { image_url: 'https://media.collegedekho.com/media/img/news/college_fests.jpg', post_id: 1 },
            { image_url: 'https://media.collegedekho.com/media/img/news/college_fests.jpg', post_id: 1 },
            { image_url: 'https://media.collegedekho.com/media/img/news/college_fests.jpg', post_id: 2 },
            { image_url: 'https://media.collegedekho.com/media/img/news/college_fests.jpg', post_id: 2 },
        ]);

    })
    .catch((error) => {
        console.error(error)
    })
}

export {
    createDB,
}