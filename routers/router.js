import express from 'express'
const router = express.Router();
import { 
    getColleges, 
    createAdmin, 
    getAdmin, 
    getCollegeNameById, 
    getAdminById 
} from '../controller/index.js'


router.get('/registration', async (req, res) => {
    try {
        const colleges = await getColleges();
        res.render('registration', { colleges });
    } 
    catch (error) {
        res.status(500).json({error: error.message});
    }
})

router.post('/createAdmin', async (req, res) => {
    try {
        const admin = await createAdmin(req.body)
        if(admin) {
            console.log('\n:::: Admin created! ::::\n')
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get('/getAdmin/:id', async(req, res) => {
    const admin_id = req.params.id;

    try {
        const admin = await getAdminById(admin_id)
        const college_name = await getCollegeNameById(admin.college_id)
        res.status(200).json({admin, college_name});
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post('/getAdmin', async(req, res) => {
    try {
        const { admin_id } = await getAdmin(req.body) // username, password
        if(!admin_id) {
            res.status(401).json({ error: 'Admin not found!' });
        }
        else {
            res.redirect(`/getAdmin/${admin_id}`)
        }
    }
    catch(error) {
        res.status(500).json({ error: error.message });
    }
})


export default router