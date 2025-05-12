import express from 'express'
import router from './routers/router.js'
import { createDB } from './controller/index.js'

const app = express()
const port = 3000

// middlewares & settings
app.set('view engine', 'ejs')
app.set('views', './views');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// using routers
app.use('/api', router)

// initializing DB
createDB()

// server
app.listen(port, () => {
    console.log(`\n::: Server started at port: ${port} ::::\n`)
})