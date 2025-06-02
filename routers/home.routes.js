import express from "express";
import {
  getAllUpcomingPosts,
  getCategories,
} from "../controller/index.js";

const router = express.Router();

// home page
router.get("/", async (req, res) => {
  const pageNo = parseInt(req.query.pageNo) || 1
  const pageSize = 1

  const { categories = [] } = await getCategories()
  const { success, posts, totalPages } = await getAllUpcomingPosts(pageNo, pageSize)

  res.render("pages/home", { 
    categories: categories, 
    allUpcomingEvents: success ? posts : [],
    query: req.query,
    totalPages,
    pageNo,
  })
})

export default router;
