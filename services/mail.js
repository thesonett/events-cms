import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
})

async function sendMail({ name, email, subject, message }) {
    try {
        const info = await transporter.sendMail({
            from: `"${name}" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject,
            html: `<p>${message.replace(/\n/g, '<br>')}</p>`
        })

        return { success: true, message: 'Email sent successfully!', info }
    } 
    catch (error) {
        console.error('Email failed:', error)
        return { success: false, message: 'Failed to send email!' }
    }
}

async function sendMailToRegisteredUser({ name, adminEmail, email, subject, message }) {
    try {
        const info = await transporter.sendMail({
            from: `"${name}" <${process.env.EMAIL_USER}>`,
            to: email,
            replyTo: adminEmail || process.env.EMAIL_USER,
            subject,
            html: message,
        })

        return { success: true, message: 'Email sent successfully!', info }
    } 
    catch (error) {
        console.error('Email failed:', error)
        return { success: false, message: 'Failed to send email!' }
    }
}

async function getNotified({ name, email, subject, message }) {
    try {
        const info = await transporter.sendMail({
            from: `"${name}" <${process.env.EMAIL_USER}>`,
            to: email,
            replyTo: email,
            subject,
            html: message,
        })

        return { success: true, message: 'Email sent successfully!', info }
    } 
    catch (error) {
        console.error('Email failed:', error)
        return { success: false, message: 'Failed to send email!' }
    }
}

export {
    sendMail,
    sendMailToRegisteredUser,
    getNotified,
}
