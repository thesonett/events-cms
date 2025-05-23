import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { isAuthenticated } from '../middleware/auth.js'
import {
    createUser,
    deleteUserById,
    getOrganizingCommitteeById,
    getOrganizingCommittees,
    getRoleById,
    getRoles,
    getUser,
    getUserById,
} from '../controller/index.js';

dotenv.config()
const router = express.Router()

// registration page
router.get('/register', async (req, res) => {
    const notify = req.flash('message')[0]

    const { organizingCommitties, success, message } = await getOrganizingCommittees()
    const rolesResult = await getRoles();

    const roles = rolesResult.success ? rolesResult.roles : [];

    res.render('registration', { organizingCommitties, roles, notify })
})

// create new user
router.post('/create', async (req, res) => {
    const { first_name, last_name, email, password, username, organizing_committee_id, role_id } = req.body
    const { message } = await createUser({ first_name, last_name, email, password, username, status: 1, is_owner: true, organizing_committee_id, role_id })
    
    req.flash('message', message)
    res.redirect(`/users/register`)
})

// dashboard page
router.get('/user/:id', isAuthenticated, async (req, res) => {
    const id = req.params.id
    const { user } = await getUserById(id)
    const { name } = await getOrganizingCommitteeById(user.organizing_committee_id)
    const { role } = await getRoleById(user.role_id)

    res.render('user', { user, name, role })
})

// login
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const { user, success, message } = await getUser({ email, password })

    if (!success) {
        req.flash('message', message)
        return res.redirect('/users/login')
    }

    req.session.user = { id: user.id }

    const token = jwt.sign({ _id: user.id, email: user.email }, process.env.MY_SECRET_KEY, { expiresIn: '24h' })
    res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000 })

    req.flash('message', message)
    return res.redirect(`/users/user/${user.id}`)
})

// login page
router.get('/login', (req, res) => {
    const notify = req.flash('message')[0]

    res.clearCookie('connect.sid')
    res.setHeader('Cache-Control', 'no-store')
    res.render('login', { notify })
})

// logout
// TODO: NOT DESTROYING SESSION FOR NOW!
router.post('/logout', (req, res) => {
    req.flash('message', 'Logged out successfully!')

    res.clearCookie('connect.sid')
    res.clearCookie('token')
    res.redirect('/users/login')
})

// delete user
router.post('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const { success, message } = await deleteUserById(id)

    if (success) {
        req.flash('message', message)
        return res.redirect('/users/register')
    }

    res.status(500).send({ error: message })
})


export default router;
