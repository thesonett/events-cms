import express from 'express';
import { isAuthenticated } from '../middleware/auth.js'
import { 
    getColleges, 
    getCollegeNameById, 
    createUser, 
    getUser, 
    getUserById,
    deleteUserById,
} from '../controller/index.js';
const router = express.Router();

// registration page
router.get('/register', async (req, res) => {
    try {
        const { colleges, success, message } = await getColleges();
        if (!success) {
            return res.status(401).json({ error: message });
        }

        const notify = req.query.success === 'true' ? 'Registration successful!' : null

        res.render('registration', { colleges,  notify });

    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// create new user
router.post('/createUser', async (req, res) => {
    try {
        const { user, success, message } = await createUser(req.body);
        if (!success) {
            return res.status(401).json({ error: message });
        }
        
        res.redirect(`/api/register?success=${success}`);

    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// user dashboard page
router.get('/user/:id', isAuthenticated, async (req, res) => {
    const user_id = req.params.id;

    try {
        const { user, success, message } = await getUserById(user_id);
        if (!success) {
            return res.status(401).json({ error: message });
        }

        const { college_name, success: collegeSuccess, message: collegeMsg } = await getCollegeNameById(user.college_id);
        if (!collegeSuccess) {
            return res.status(401).json({ error: collegeMsg });
        }

        res.render('user', { user, college_name });

    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// login
router.post('/login', async (req, res) => {
    const { user_email, password } = req.body

    try {
        const { user, success, message } = await getUser({user_email, password});

        if (!success) {
            return res.status(401).json({ error: message });
        }

        // creating a session
        req.session.user = {
            email: user.user_email,
            id: user.user_id
        };

        res.redirect(`/api/user/${user.user_id}`);

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
        const user_id = req.params.id;
        const { success, message } = await deleteUserById(user_id);

        if (!success) {
            return res.status(401).json({ error: message });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
