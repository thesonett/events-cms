import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(/*process.env.DB_PUBLIC_URL,*/ {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    dialect: process.env.DB_DIALECT,
})

await sequelize.authenticate().then(async () => {
    console.log('\n:::: Database connected!! ::::\n')

}).catch((error) => {
    console.log('\n:::: Database connection failed!! ::::\n', error)
})

export default sequelize;