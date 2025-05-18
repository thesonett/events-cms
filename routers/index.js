import express from 'express';

import userRoutes from './users.routes.js';

const router = express.Router();

router.use('/users', userRoutes);

export default router;
