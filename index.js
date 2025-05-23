import express from 'express'
import session from 'express-session'
import dotenv from 'dotenv';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';

import router from './routers/index.js'
import initializeDB from './database/data.js'

dotenv.config();
const app = express()

// middlewares
app.set('view engine', 'ejs')
app.set('views', './views');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(session({ 
    secret: process.env.SESSION_KEY,
    resave: false, 
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

app.use(flash())

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')
    next()
});

// main route
app.use('/', router)

// database
initializeDB()

// server
app.listen(process.env.DB_PORT, () => {
    console.log(`\n::: Server started at port number: ${process.env.DB_PORT} ::::\n`)
})