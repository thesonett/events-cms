import express from "express"
import {
  getAllEvents,
  getAllUpcomingPosts,
  getCategories,
  getCategoryById,
  getImageUrlByEventId,
  getOrganizingCommitteeById,
} from "../controller/index.js"

const router = express.Router()

// home page
router.get("/", async (req, res) => {
  const pageNo = parseInt(req.query.pageNo) || 1
  const pageSize = 5

  const { events = [], totalRecords } = await getAllEvents(pageNo, pageSize)
  const { success, posts, totalPages } = await getAllUpcomingPosts(pageNo, pageSize)

  const totalEvents = await Promise.all(events.map(async (event) => {
      const { category } = await getCategoryById(event.category_id)
      const { image, success } = await getImageUrlByEventId(event.id)
      const { name } = await getOrganizingCommitteeById(event.organizing_committee_id)
  
      return { ...event.get({ plain: true }), category: category.category, organizer: name, image: success ?image.image_url : null, }
    })
  )

  res.render("pages/home", { 
    totalEvents: totalEvents || [],
    allUpcomingEvents: success ? posts : [],
    query: req.query,
    totalPages,
    pageNo,
  })
})

export default router
