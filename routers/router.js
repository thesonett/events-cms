import express from 'express'
import { getAllColleges } from '../controller/collegeController.js'
const router = express.Router();

router.get('/colleges', async (req, res) => {
    try {
        const colleges = await getAllColleges();
        res.render('registration', { colleges }); // saying that-> render registration.ejs and pass colleges.
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

export default router