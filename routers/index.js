import express from 'express'

import userRoutes from './users.routes.js'
import imageRoutes from './images.routes.js'

const router = express.Router()

router.use('/users', userRoutes)
router.use('/images', imageRoutes)

// index page
router.get('/', (req, res) => {
  res.render('pages/index')
});


export default router;
