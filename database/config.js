import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

// for local
// const sequelize = new Sequelize({
//     host: process.env.DB_HOST,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE_NAME,
//     dialect: process.env.DB_DIALECT,
// })

// for deployment
const sequelize = new Sequelize(process.env.DB_PUBLIC_URL, {
    dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
})

await sequelize.authenticate().then(async () => {
    console.log('\n:::: Database connected!! ::::\n')

}).catch((error) => {
    console.log('\n:::: Database connection failed!! ::::\n', error)
})

export default sequelize;