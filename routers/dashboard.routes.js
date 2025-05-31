import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import express from 'express'
import bcrypt from 'bcrypt'

import { createActivity, createUser, deleteUserById, getActiveUsers, getActivities, getAllPosts, getEventsByOrganizingCommitteeId, getOnlyUsers, getOrganizingCommitteeById, getUserById, updateUserById } from '../controller/index.js'
import { getStatus } from '../services/status.js'

dotenv.config()
const router = express.Router()

// dashboard home page
router.get('/', async (req, res) => {
    const token = req.cookies?.token
    const decoded = jwt.verify(token, process.env.MY_SECRET_KEY)
    const { users } = await getActiveUsers(decoded._id)
    const { user } = await getUserById(decoded._id)
    const { events = [] } = await getEventsByOrganizingCommitteeId(user.organizing_committee_id) || {}
    const { posts = [] } = await getAllPosts()

    const upcomingEvents = posts.filter(post => getStatus(post.date, post.time) === 'upcoming')
    const result = await getActivities(user.id)
    const activities = result.success ? result.activities : []
    
    res.render('pages/dashboard/home', { 
        layout:'layouts/dashboardLayout',  
        admin: user,
        activities,
        activeUsers: users,
        events,
        upcomingEvents,
    })
})

// dashboard users page
router.get('/users', async (req, res) => {
    const message = req.flash('message')[0]
    const selectedStatus = req.query.status || ''

    const token = req.cookies?.token
    const decoded = jwt.verify(token, process.env.MY_SECRET_KEY)
    let { users } = await getOnlyUsers(decoded._id)
    const { user } = await getUserById(decoded._id)
    const { name } = await getOrganizingCommitteeById(user.organizing_committee_id)

    // Filter users by status
    if (selectedStatus === 'active') {
        users = users.filter(user => user.status === 1)
    } 
    else if (selectedStatus === 'inactive') {
        users = users.filter(user => user.status === 0)
    }

    res.render('pages/dashboard/users', { 
        layout:'layouts/dashboardLayout',  
        admin: user,
        onlyUsers: users,
        organizingCommittee: name,
        selectedStatus,
        notify: message? message : null,
    })
})

// dashboard create new user
router.post('/user/create', async (req, res) => {
    const sessionUser = req.user
    const { first_name, last_name, email, username, password, organizing_committee_id, role_id } = req.body

    if (!first_name || !last_name || !email || !username || !password) {
        req.flash('message', 'Please fill all required fields!')
        return res.redirect('/dashboard/users')
    }

    const { message } = await createUser({ first_name, last_name, email, password, username, status: 1, is_owner: true, organizing_committee_id, role_id })

    await createActivity({ actions: message || null, user_id: sessionUser._id })
    req.flash('message', message)
    res.redirect(`/dashboard/users`)
})


// dashboard delete user
router.post('/delete/user/:id', async (req, res) => {
    const token = req.cookies?.token
    const decoded = jwt.verify(token, process.env.MY_SECRET_KEY)

    const id = req.params.id
    const { user } = await getUserById(id)
    const { message } = await deleteUserById(user.id)
    await createActivity({ actions: message? message : null, user_id: decoded._id })

    req.flash('message', message)
    return res.redirect('/dashboard/users')
})

// dashboard settings page
router.get('/settings', async (req, res) => {
    const message = req.flash('message')[0]

    const token = req.cookies?.token
    const decoded = jwt.verify(token, process.env.MY_SECRET_KEY)
    const { user } = await getUserById(decoded._id)

    res.render('pages/dashboard/settings', {
        layout:'layouts/dashboardLayout',
        admin: user,
        notify: message? message : null
    })
})

// update profile credentials
router.post('/settings/update/profile', async (req, res) => {
    const token = req.cookies?.token
    const decoded = jwt.verify(token, process.env.MY_SECRET_KEY)

    const {first_name, last_name, username, email } = req.body
    const { user } = await getUserById(decoded._id)
    const { message } = await updateUserById(user.id, {
        first_name,
        last_name,
        username, 
        email,
    })

    await createActivity({ actions: message? message : null, user_id: decoded._id })

    req.flash('message', message)
    return res.redirect('/dashboard/settings')
})

// update profile password
router.post('/settings/update/password', async (req, res) => {
    const token = req.cookies?.token
    const decoded = jwt.verify(token, process.env.MY_SECRET_KEY)

    const { currentPassword, newPassword, confirmPassword } = req.body
    const { user } = await getUserById(decoded._id)

    const isMatch = await bcrypt.compare(currentPassword, user.password)
    console.table([newPassword, confirmPassword, isMatch])

    if (!isMatch) {
        req.flash('message', 'Current password is incorrect!')
        return res.redirect('/dashboard/settings')
    }

    if (newPassword.length < 8) {
        req.flash('message', 'New password must be at least 8 characters long!')
        return res.redirect('/dashboard/settings')
    }

    if (newPassword !== confirmPassword) {
        req.flash('message', 'New passwords do not match!')
        return res.redirect('/dashboard/settings')
    }

    const { message } = await updateUserById(user.id, { password: newPassword })
    await createActivity({ actions: message? message : null, user_id: decoded._id })

    req.flash('message', message)
    return res.redirect('/dashboard/settings')
})

export default router