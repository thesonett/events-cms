import express from 'express';
const router = express.Router();
import { 
    getColleges, 
    createAdmin, 
    getAdmin, 
    getCollegeNameById, 
    getAdminByEmail,
    deleteAdminByEmail,
} from '../controller/index.js';

// registration page
router.get('/register', async (req, res) => {
    try {
        const { colleges, success, message } = await getColleges();
        if (!success) {
            return res.status(401).json({ error: message });
        }

        res.render('registration', { colleges });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// create new admin
router.post('/createAdmin', async (req, res) => {
    try {
        const { admin, success, message } = await createAdmin(req.body);
        if (!success) {
            return res.status(401).json({ error: message });
        }
        

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// admin dashboard page
router.get('/admin/:mail', async (req, res) => {
    const admin_email = decodeURIComponent(req.params.mail);

    try {
        const { admin, success, message } = await getAdminByEmail(admin_email);
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

// get admin
router.post('/login', async (req, res) => {
    const { admin_email, password } = req.body

    try {
        const { admin, success, message } = await getAdmin({admin_email, password});

        if (!success) {
            return res.status(401).json({ error: message });
        }

        res.redirect(`/api/admin/${encodeURIComponent(admin_email)}`);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// login page
router.get('/login', async(req, res) => {
    res.render('login')
})

// delete admin by id
router.post('/deleteAdmin/:mail', async (req, res) => {
    try {
        const admin_email = decodeURIComponent(req.params.mail);
        const { success, message } = await deleteAdminByEmail(admin_email);

        if (!success) {
            return res.status(401).json({ error: message });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
