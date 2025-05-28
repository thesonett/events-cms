import express from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { getUserById } from '../controller/index.js'

const router = express.Router()

dotenv.config()

// events page
router.get('/', async (req, res) => {
    const token = req.cookies?.token
    const decoded = jwt.verify(token, process.env.MY_SECRET_KEY)

    const { user } = await getUserById(decoded._id)

    res.render('pages/dashboard/events', {
        layout:'layouts/dashboardLayout',
        admin: user,
    })
})

// posts page
router.get('/post', async (req, res) => {
    const token = req.cookies?.token
    const decoded = jwt.verify(token, process.env.MY_SECRET_KEY)

    const { user } = await getUserById(decoded._id)

    res.render('pages/dashboard/posts', {
        layout:'layouts/dashboardLayout',
        admin: user,
    })
})


export default router