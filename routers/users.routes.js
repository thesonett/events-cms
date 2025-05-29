import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { isAuthenticated, isUser } from '../middleware/auth.js'
import {
    createUser,
    deleteUserById,
    createOrganizingCommittee,
    getOrganizingCommitteeById,
    getOrganizingCommittees,
    getRoleById,
    getRoles,
    getUser,
    getUserById,
} from '../controller/index.js'

dotenv.config()
const router = express.Router()

// registration page
router.get('/register', async (req, res) => {
    const notify = req.flash('message')[0]

    const { organizingCommitties, success, message } = await getOrganizingCommittees()
    const rolesResult = await getRoles();
    const roles = rolesResult.success ? rolesResult.roles : [];

    res.render('pages/registration', { organizingCommitties, roles, notify })
})

// create new user
router.post('/create', async (req, res) => {
    const { first_name, last_name, email, password, username, organizing_committee_id, new_organizing_committee, role_id } = req.body

    let finalOrganizingCommitteeId = organizing_committee_id

    // if user chooses 'other' option
    if (organizing_committee_id === 'other' && new_organizing_committee?.trim()) {
        const capitalizedName = new_organizing_committee.trim().toLowerCase().split(' ').filter(word => word.length > 0).map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

        const { organizingCommittee, message, success } = await createOrganizingCommittee({ name: capitalizedName })

        if (!success) {
            req.flash('message', message)
            return res.redirect('/users/register')
        }

        finalOrganizingCommitteeId = organizingCommittee.id
    }

    const { message } = await createUser({ first_name, last_name, email, password, username, status: 1, is_owner: true, organizing_committee_id: finalOrganizingCommitteeId, role_id })
    
    req.flash('message', message)
    res.redirect(`/users/register`)
})

// profile page only for users
router.get('/user/:id', isAuthenticated, isUser, async (req, res) => {
    const id = parseInt(req.params.id)
    const sessionUser = req.user

    if(id !== sessionUser._id) {
        return res.redirect(`/users/user/${sessionUser._id}`)
    }

    const { user } = await getUserById(id)
    const { name } = await getOrganizingCommitteeById(user.organizing_committee_id)
    const { role } = await getRoleById(user.role_id)
    if (role === 'admin') {
        return res.redirect(`/users/user/${sessionUser._id}`)
    }
    
    res.render('pages/user', { user, name, role })
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

    const token = jwt.sign({ _id: user.id, email: user.email, role_id: user.role_id }, process.env.MY_SECRET_KEY, { expiresIn: '24h' })
    res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000 })

    req.flash('message', message)
    return res.redirect('/')
})

// login page
router.get('/login', (req, res) => {
    const notify = req.flash('message')[0]

    res.clearCookie('connect.sid')
    res.clearCookie('token')
    res.setHeader('Cache-Control', 'no-store')

    res.render('pages/login', { notify })
})

// logout
router.all('/logout', (req, res) => { // TODO: NOT DESTROYING SESSION FOR NOW!
  req.flash('message', 'Logged out successfully!')

  res.clearCookie('connect.sid')
  res.clearCookie('token')
  res.redirect('/users/login')
})

// delete user
router.post('/delete/:id', async (req, res) => {
    const id = req.params.id
    const { success, message } = await deleteUserById(id)

    if (success) {
        req.flash('message', message)
        res.clearCookie('token')
        return res.redirect('/users/login')
    }

    res.status(500).send({ error: message })
})


export default router;
