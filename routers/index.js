import express from 'express'
import renderPage from '../services/render.js'
import userRoutes from './users.routes.js'
import imageRoutes from './images.routes.js'

const router = express.Router()

router.use('/users', userRoutes)
router.use('/images', imageRoutes)

// home page by default
router.get('/', (req, res) => { 
  res.render('pages/home')
  // renderPage(res, 'home') // testing
});


export default router;
