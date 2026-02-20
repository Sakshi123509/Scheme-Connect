import express from 'express';
import { applyForScheme, getMyApplications, getApplicationById, getAllApplications, updateApplicationStatus } from '../controllers/applicationcontroller.js';

import authMiddleware from '../middleware/authmiddleware.js';
import adminMiddleware from '../middleware/adminmiddleware.js';


const router = express.Router();

// User routes
router.post('/', authMiddleware, applyForScheme);
router.get('/my', authMiddleware, getMyApplications);
router.get('/:id', authMiddleware, getApplicationById);


// Admin routes
router.get('/', authMiddleware, adminMiddleware, getAllApplications);
router.put('/:id/status', authMiddleware, adminMiddleware, updateApplicationStatus);

export default router;