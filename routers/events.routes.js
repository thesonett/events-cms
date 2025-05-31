import express from 'express'
import { getAllEvents, getCategories, getCategoryById, getImageUrlByEventId, getOrganizingCommitteeById, getOrganizingCommittees } from '../controller/index.js'

const router = express.Router()

// events page
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

    const { categories: allCategories } = await getCategories()
    const { organizingCommitties: allOrganizers } = await getOrganizingCommittees()
    
    res.render('pages/events', { 
        categories: categories || [], 
        totalEvents,
        allCategories: allCategories || [],
        allOrganizers: allOrganizers || [],
    })
})


// events details page
router.get('/:id', (req, res) => {
    const eventId = Number(req.params.id)
    console.log(eventId)

    res.render('pages/event_details', {

    })
})


// An event's post page
router.get('/posts/post/:id', (req, res) => {
    const postId = req.params.id
    console.log(postId)

    res.render('pages/post')
})

export default router