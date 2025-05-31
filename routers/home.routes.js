import express from 'express'
import { getAllEvents, getCategories, getCategoryById, getImageUrlByEventId, getOrganizingCommitteeById } from '../controller/index.js'

const router = express.Router()

// home page
router.get('/', async (req, res) => {
  const { categories } = await getCategories()
  const { events } = await getAllEvents()

  const safeEvents = events || []

   const totalEvents = await Promise.all(safeEvents.map(async (event) => {
    const { category } = await getCategoryById(event.category_id)
    const { image, success } = await getImageUrlByEventId(event.id)
    const { name } = await getOrganizingCommitteeById(event.organizing_committee_id)

    return {
      ...event.get({ plain: true }),
      category: category.category,
      organizer: name,
      image: success ? image.image_url : null,
    }
  }))

  res.render('pages/home', { 
    categories: categories || [], 
    totalEvents,
  })
})

export default router