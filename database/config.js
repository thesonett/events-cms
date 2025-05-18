import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    dialect: process.env.DB_DIALECT,
})

await sequelize.authenticate().then(async () => {
    console.log('\nDatabase connected!!\n')

}).catch((error) => {
    console.log('\nDatabase connection failed!\n', error)
})

export default sequelize;