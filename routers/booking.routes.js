import express from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import { getPostById, getUserById } from '../controller/index.js'
import { getNotified } from '../services/mail.js'

dotenv.config()
const router = express.Router()

router.get('/:id', async (req, res) => {
    if (!req.cookies.token) {
        return res.redirect('/users/register')
    }

    const postId = req.params.id
    const token = req.cookies.token
    const decoded = jwt.verify(token, process.env.MY_SECRET_KEY)

    const { user } = await getUserById(decoded._id)
    const { post } = await getPostById(postId)

    const { message } = await getNotified({
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        subject: `Details About An Event: ${post.title}`,
        message: `<p>Hello ${user.first_name},</p>
            <p>Thank you for viewing "<strong>${post.title}</strong>".</p>
            <p><strong>Details:</strong><br>${post.description}</p>
            <p>Regards,<br>Events CMS Team</p>`
    })

    req.flash('message', message)
    res.redirect(`/events/posts/post/${postId}`)
})


export default router