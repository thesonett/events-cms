import express from 'express';
import { isAuthenticated } from '../middleware/auth.js'
import {
    createUser,
    deleteUserById,
    getOrganizingCommitteeById,
    getOrganizingCommitties,
    getRoleById,
    getRoles,
    getUser,
    getUserById,
} from '../controller/index.js';

const router = express.Router();

// registration page
router.get('/register', async (req, res) => {
    try {
        const { organizingCommitties, success, message } = await getOrganizingCommitties();
        const { roles } = await getRoles();

        if (!success) {
            return res.status(401).json({ error: message });
        }

        const notify = req.query.success === 'true' ? 'Registration successful!' : null

        res.render('registration', { organizingCommitties, roles, notify });

    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// create new user
router.post('/createUser', async (req, res) => {
    const {first_name, last_name, email, password, username, organizing_committee_id, role_id } = req.body

    try {
        const { user, success, message } = await createUser({
            first_name, 
            last_name, 
            email, 
            password, 
            username,
            status: 1,
            is_owner: true,  
            organizing_committee_id,
            role_id,
        });


        if (!success) {
            return res.status(401).json({ error: message });
        }
        
        res.redirect(`/api/register?success=${success}`);

    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// dashboard page
router.get('/user/:id', isAuthenticated, async (req, res) => {
    const id = req.params.id;

    try {
        const { user, success, message } = await getUserById(id);
        if (!success) {
            return res.status(401).json({ error: message });
        }

        const { name } = await getOrganizingCommitteeById(user.organizing_committee_id);
        const { role } = await getRoleById(user.role_id)

        res.render('user', { user, name, role });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// login
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const { user, success, message } = await getUser({email, password});

        if (!success) {
            return res.status(401).json({ error: message });
        }
        
        req.session.user = { id: user.id };
        res.redirect(`/api/user/${user.id}`);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// login page
router.get('/login', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Failed to destroy session:', err);
        }

        res.clearCookie('connect.sid');
        res.setHeader('Cache-Control', 'no-store');

        const notify = req.query.notify || null;
        res.render('login', { notify });
    });
});

// logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to logout' });
        }

        res.clearCookie('connect.sid');
        res.setHeader('Cache-Control', 'no-store');
        res.redirect('/api/login')
    });
});

// delete user
router.post('/deleteUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { success, message } = await deleteUserById(id);

        if (!success) {
            return res.status(401).json({ error: message });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
