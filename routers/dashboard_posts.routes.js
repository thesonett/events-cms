import express from 'express'
import dotenv from 'dotenv'

import { getUserById } from '../controller/index.js'

const router = express.Router()
dotenv.config()

// posts page
router.get('/post/:id', async (req, res) => {
    const eventId = req.params.id
    const sessionUser = req.user

    console.log("\n:::: EVENT ID FOR POST ===> ", eventId)

    const { user } = await getUserById(sessionUser._id)
    
    res.render('pages/dashboard/posts', {
        layout:'layouts/dashboardLayout',
        admin: user,
    })
})

export default router
