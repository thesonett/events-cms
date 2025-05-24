import express from 'express'

import userRoutes from './users.routes.js'
import imageRoutes from './images.routes.js'

const router = express.Router()

router.use('/users', userRoutes)
router.use('/images', imageRoutes)

// default page
router.get('/', (req, res) => {
  res.render('../views/pages/home', { layout: 'layouts/main' })
});


export default router;
