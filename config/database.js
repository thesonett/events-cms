import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'mysql',
    username: 'root',
    password: 'root',
    database: 'events_cms',
})

await sequelize.authenticate().then(() => {
    console.log('Database connected!!')
}).catch((error) => {
    console.log('Unable to connect Database :::: ', error)
})

export default sequelize;