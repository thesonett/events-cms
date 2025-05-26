import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import express from 'express'
import { getActiveUsers, getOnlyUsers, getOrganizingCommitteeById, getUserById } from '../controller/index.js'

dotenv.config()
const router = express.Router()

router.get('/', async (req, res) => {
    const token = req.cookies?.token
    const decoded = jwt.verify(token, process.env.MY_SECRET_KEY)
    const { users } = await getActiveUsers(decoded._id)
    const { user } = await getUserById(decoded._id)
    
    res.render('pages/dashboard/home', { 
        layout:'layouts/dashboardLayout',  
        activeUsers: users,
        admin: user,
    })
})

router.get('/users', async (req, res) => {
    const token = req.cookies?.token
    const decoded = jwt.verify(token, process.env.MY_SECRET_KEY)
    const { users } = await getOnlyUsers(decoded._id)
    const { user } = await getUserById(decoded._id)
    const { name } = await getOrganizingCommitteeById(user.organizing_committee_id)

    console.log(user)

    res.render('pages/dashboard/users', { 
        layout:'layouts/dashboardLayout',  
        onlyUsers: users,
        admin: user,
        organizingCommittee: name,
    })
})

export default router