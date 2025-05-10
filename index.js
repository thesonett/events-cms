const express = require('express')
const dotenv = require('dotenv').config()

const app = express()
// middlewares
app.use(express.json())
app.set('view engine', 'ejs')

// server
app.listen(process.env.PORT || 5000, () => {
    console.log(dotenv)
    console.log(`Server started at port: ${process.env.PORT}`)
})

// router
