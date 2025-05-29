import express from 'express'
import userRoutes from './users.routes.js'
import imageRoutes from './images.routes.js'
import dashboardEventRoutes from './dashboard_events.routes.js'
import dashboardPostRoutes from './dashboard_posts.routes.js'
import dashboardRoutes from './dashboard.routes.js'
import { isAuthenticated, isAdmin } from '../middleware/auth.js'

const router = express.Router()

router.use('/users', userRoutes)
router.use('/images', imageRoutes)
router.use('/dashboard', isAuthenticated, isAdmin, dashboardRoutes)
router.use('/dashboard/events', dashboardEventRoutes)
router.use('/dashboard/posts',dashboardPostRoutes )

router.get('/', (req, res) => { 
  res.render('pages/home')
})

export default router;