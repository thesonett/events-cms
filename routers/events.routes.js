import express from 'express'
import { formatDate, formatTime } from '../services/formatter.js'
import { getAllEvents, getCategories, getCategoryById, getEventById, getImagesByPostId, getImageUrlByEventId, getOrganizingCommitteeById, getOrganizingCommittees, getPostById, getPostsByEventId } from '../controller/index.js'

const router = express.Router()

// events page
router.get('/', async (req, res) => {
  const message = req.flash('message')[0]
  const filters = req.query

  const { categories } = await getCategories()
  const { events } = await getAllEvents()

  let safeEvents = events || []

  // Applying filters
  if (filters.category) {
    const selectedCategories = Array.isArray(filters.category) ? filters.category : [filters.category]
    safeEvents = safeEvents.filter(event => selectedCategories.includes(String(event.category_id)))
  }

  if (filters.organizer) {
    const selectedOrganizers = Array.isArray(filters.organizer) ? filters.organizer : [filters.organizer]
    safeEvents = safeEvents.filter(event => selectedOrganizers.includes(String(event.organizing_committee_id)))
  }

  const totalEvents = await Promise.all(
    safeEvents.map(async (event) => {
      const { category } = await getCategoryById(event.category_id)
      const { image, success } = await getImageUrlByEventId(event.id)
      const { name } = await getOrganizingCommitteeById(event.organizing_committee_id)

      return { ...event.get({ plain: true }), category: category.category, organizer: name, image: success ? image.image_url : null, }
    })
  )

  const { categories: allCategories } = await getCategories()
  const { organizingCommitties: allOrganizers } = await getOrganizingCommittees()

  res.render('pages/events', {
    categories: categories || [],
    totalEvents,
    allCategories: allCategories || [],
    allOrganizers: allOrganizers || [],
    query: filters,
    notify: message ? message : null,
  })
})

// events details page
router.get('/:id', async (req, res) => {
    const eventId = Number(req.params.id)
    const filters = req.query

    const { event } = await getEventById(eventId)
    const { category } = await getCategoryById(event.category_id)
    const { image } = await getImageUrlByEventId(event.id)
    const { name: organizer } = await getOrganizingCommitteeById(event.organizing_committee_id)
    const { posts = [] } = await getPostsByEventId(eventId)

    let postsWithImages = await Promise.all(
        posts.map(async post => {
            const { images = [] } = await getImagesByPostId(post.id)
            return {
                ...post.get({ plain: true }),
                images: images.map(img => img.get({ plain: true }))
            }
        })
    )

    // Apply filters
    if (filters.venue) {
        const selectedVenues = Array.isArray(filters.venue) ? filters.venue : [filters.venue]
        postsWithImages = postsWithImages.filter(post => selectedVenues.includes(post.venue))
    }

    if (filters.location) {
        const selectedLocations = Array.isArray(filters.location) ? filters.location : [filters.location]
        postsWithImages = postsWithImages.filter(post => selectedLocations.includes(post.location))
    }

    if (filters.duration) {
        const selectedDurations = Array.isArray(filters.duration) ? filters.duration : [filters.duration]
        postsWithImages = postsWithImages.filter(post => selectedDurations.includes(String(post.duration)))
    }

    if (filters.status) {
        const selectedStatuses = Array.isArray(filters.status) ? filters.status : [filters.status]
        postsWithImages = postsWithImages.filter(post => selectedStatuses.includes(post.status))
    }

    if (filters.date) {
        const selectedDates = Array.isArray(filters.date) ? filters.date : [filters.date]
        postsWithImages = postsWithImages.filter(post => selectedDates.includes(formatDate(post.date)))
    }

    const locations = [...new Set(posts.map(p => p.location))]
    const venues = [...new Set(posts.map(p => p.venue))]
    const durations = [...new Set(posts.map(p => p.duration))]
    const statuses = [...new Set(posts.map(p => p.status))]
    const dates = [...new Set(posts.map(p => formatDate(p.date)))]

    res.render('pages/event_details', { event, category, image, organizer, postsWithImages, locations, venues, durations, statuses, dates, query: req.query })
})


// An event's post page
router.get('/posts/post/:id', async (req, res) => {
    const postId = req.params.id
    const { post } = await getPostById(postId)
    const { images } = await getImagesByPostId(post.id)

    res.render('pages/post', { post: post || null, images: images || [] })
})

export default router