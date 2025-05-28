import express from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import { createCategory, createEvent, createImage, getCategories, getUserById } from '../controller/index.js'
import { uploadImage, upload } from '../services/cloudinary.js'

const router = express.Router()
dotenv.config()

// events page
router.get('/', async (req, res) => {
    const message = req.flash('message')[0]

    const token = req.cookies?.token
    const decoded = jwt.verify(token, process.env.MY_SECRET_KEY)
    
    const { user } = await getUserById(decoded._id)
    const { categories } = await getCategories()

    res.render('pages/dashboard/events', {
        layout:'layouts/dashboardLayout',
        admin: user,
        categories,
        notify: message? message : null,
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

// create new event
router.post('/event/create', upload.single('image'), async(req, res) => {
    const token = req.cookies?.token
    const decoded = jwt.verify(token, process.env.MY_SECRET_KEY)
    const { user } = await getUserById(decoded._id)

    const { title, description, date, category_id, customCategory } = req.body
    let finalCategoryId = category_id

    // if 'other' option, then create new category
    if (category_id === 'Other' && customCategory) {
        const { category } = await createCategory({ category: customCategory })
        finalCategoryId = category.id
    }

    const { event, message } = await createEvent({ title, description, date, category_id: finalCategoryId, organizing_committee_id: user.organizing_committee_id, role_id: decoded.role_id })

    // default image
    let image_url = 'https://instaily.com/_next/static/media/test.b3910688.jpg'
    let file_name = 'default.jpg'
    let original_filename = 'default.jpg'
    let size = '0'

    // if admin uploads an image otherwise default image will be created
    if (req.file) {
        const { success, message, imageData } = await uploadImage({ 
            original_filename: req.file.originalname, 
            buffer: req.file.buffer 
        })

        if(success) {
            file_name = imageData.file_name
            image_url = imageData.image_url
            original_filename = req.file.originalname
            size = `${req.file.size}`
        }
    }

    await createImage({ file_name, original_filename, image_url, size, entity_type: 'event', entity_id: event.id, events_id: event.id })

    req.flash('message', message)
    res.redirect('/dashboard/events')
})

export default router