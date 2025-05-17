import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize({
    host: 'localhost',
    username: 'root',
    password: 'root',
    database: 'events_cms',
    dialect: 'mysql',
})

await sequelize.authenticate().then(async () => {
    console.log('\n :::: Database connected!! ::::\n')
}).catch((error) => {
    console.log('\n:::: Unable to connect Database :::: \n', error)
})

export default sequelize;