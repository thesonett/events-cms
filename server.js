import express from 'express'
import sequelize from './config/database.js'
import Colleges from './models/Colleges.js'
const app = express()
const port = 3000

// middlewares
app.use(express.json())
app.set('view engine', 'ejs')

// creating tables
await sequelize.sync({force: true})
.then((data) => {
    console.log(data)
    console.log('tables created!')
})
.catch((error) => {
    console.log('Error creating tables ::: ', error)
})

// routes


// server
app.listen(port, () => {
    console.log(`Server started at port: ${port}`)
})
