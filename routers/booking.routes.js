import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const router = express.Router()

router.get('/:id', async (req, res) => {
    // if token is absent, then redirect to registration page.
    if(!req.cookies.token) {
        res.redirect('/users/register')
    }

    // TODO: if token is present, then..
    const postId = req.params.id
    res.redirect(`/events/posts/post/${postId}`)
})

export default router