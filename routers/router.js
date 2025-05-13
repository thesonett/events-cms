import express from 'express';
import { isAuthenticated } from '../middleware/auth.js'
import { 
    getColleges, 
    createAdmin, 
    getAdmin, 
    getCollegeNameById, 
    getAdminById,
    deleteAdminById,
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

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// create new admin API
router.post('/createAdmin', async (req, res) => {
    try {
        const { admin, success, message } = await createAdmin(req.body);
        if (!success) {
            return res.status(401).json({ error: message });
        }
        
        res.redirect(`/api/register?success=${success}`);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// admin dashboard page
router.get('/admin/:id', isAuthenticated, async (req, res) => {
    const admin_id = decodeURIComponent(req.params.id);

    try {
        const { admin, success, message } = await getAdminById(admin_id);
        if (!success) {
            return res.status(401).json({ error: message });
        }

        const { college_name, success: collegeSuccess, message: collegeMsg } = await getCollegeNameById(admin.college_id);
        if (!collegeSuccess) {
            return res.status(401).json({ error: collegeMsg });
        }

        res.render('admin', { admin, college_name });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// login API
router.post('/login', async (req, res) => {
    const { admin_email, password } = req.body

    try {
        const { admin, success, message } = await getAdmin({admin_email, password});

        if (!success) {
            return res.status(401).json({ error: message });
        }

        // creating a session
        req.session.admin = {
            email: admin.admin_email,
            id: admin.admin_id
        };

        res.redirect(`/api/admin/${encodeURIComponent(admin.admin_id)}`);

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

// logout API
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

// delete admin by admin email
router.post('/deleteAdmin/:id', async (req, res) => {
    try {
        const admin_id = decodeURIComponent(req.params.id);
        const { success, message } = await deleteAdminById(admin_id);

        if (!success) {
            return res.status(401).json({ error: message });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
