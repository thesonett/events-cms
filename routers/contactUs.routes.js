import express from 'express'
import dotenv from 'dotenv'
import { sendMail } from '../services/mail.js'

dotenv.config()
const router = express.Router()

// contact us page
router.get('/', (req, res) => {
    const message = req.flash('message')[0]

    res.render('pages/contactUs', {
        notify: message? message : null,
    })
})

// contact us sending mail form
router.post('/submit', async (req, res) => {
    const { name, email, subject, message } = req.body

    const { success, message: mailStatus } = await sendMail({ name, email, subject, message })

    req.flash('message', mailStatus)
    res.redirect('/contactUs')
})

export default router