import express from 'express'
import sequelize from './config/database.js'
import router from './routers/router.js'
import { College, Admin } from './models/index.js'

const app = express()
const port = 3000

// middlewares & settings
app.set('view engine', 'ejs')
app.set('views', './views');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)

// creating database tables
await sequelize.sync({force: true})
.then(() => {
    College.bulkCreate([
        { college_id: 101, college_name: 'IIT Kharagpur' },
        { college_id: 102, college_name: 'IIT Bombay' },
        { college_id: 103, college_name: 'IIT Delhi' },
        { college_id: 104, college_name: 'Jadavpur University' },
        { college_id: 105, college_name: 'MAKAUT' },
        { college_id: 106, college_name: 'AIIMS Delhi' },
        { college_id: 107, college_name: 'NIT Durgapur' },
    ]);

    console.log('\n:::: All the database tables got created! ::::\n')
})
.catch((error) => {
    console.log('\n:::: Error creating tables :::::\n ', error)
})

// server
app.listen(port, () => {
    console.log(`\n::: Server started at port: ${port} ::::\n`)
})
