import express from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import { getPostById, getUserById } from '../controller/index.js'
import { getNotified } from '../services/mail.js'

dotenv.config()
const router = express.Router()

router.get('/:id', async (req, res) => {
    if (!req.cookies.token) {
        req.flash('message', 'Kindly Login or Register Yourself First!')
        return res.redirect('/users/register')
    }

    const postId = req.params.id
    const token = req.cookies.token
    const decoded = jwt.verify(token, process.env.MY_SECRET_KEY)

    const { user } = await getUserById(decoded._id)
    const { post } = await getPostById(postId)

    await getNotified({
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        subject: `Booking Confirmed: ${post.title}`,
        message: `<p>Hi ${user.first_name},</p>
            <p>Your booking for the event "<strong>${post.title}</strong>" has been successfully confirmed.</p>
            <p><strong>Show Details:</strong><br>${post.description}</p>
            <p>We look forward to your participation and hope you have a great experience!</p>
            <p>If you have any questions, feel free to reply to this email.</p>
            <p>Best regards,<br><strong>Events CMS Team</strong></p>`
    })

    let bookingStatus = true
    req.flash('message', 'Booking successfully done!')
    req.flash('bookingStatus', bookingStatus)

    res.redirect(`/events/posts/post/${postId}`)
})


export default router