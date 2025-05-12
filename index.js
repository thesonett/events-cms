import express from 'express'
import session from 'express-session'
import router from './routers/router.js'
import { createDB } from './controller/index.js'

const app = express()
const port = 3000

// middlewares & settings
app.set('view engine', 'ejs')
app.set('views', './views');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: "blf/-*9~6&o&D{mGt+b'pKe]R24e|{", // should be created by JWT
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));
app.use((req, res, next) => { // clears cache
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

// using routers
app.use('/api', router)

// initializing DB
createDB()

// server
app.listen(port, () => {
    console.log(`\n::: Server started at port: ${port} ::::\n`)
})