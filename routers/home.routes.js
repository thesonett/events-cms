import express from "express";
import {
  getAllEvents,
  getCategories,
  getImagesByPostId,
  getPostsByEventId,
} from "../controller/index.js";

const router = express.Router();

// home page
router.get("/", async (req, res) => {
  const { categories } = await getCategories()
  const { events } = await getAllEvents()

  const safeEvents = events || []

  const allUpcomingEvents = (await Promise.all(safeEvents.map(async event => {
    const { posts = [] } = await getPostsByEventId(event.id)

    const postsWithImages = await Promise.all(posts.filter(post => post.status === 'upcoming')
        .map(async post => {
          const { images = [] } = await getImagesByPostId(post.id)
          return {
            ...post.get({ plain: true }),
            images: images.map(img => img.get({ plain: true }))
          }
        })
    )

    return { posts: postsWithImages }
  }))).filter(event => event.posts.length > 0);


  res.render("pages/home", { categories: categories || [], allUpcomingEvents: allUpcomingEvents || [] })
})

export default router;
