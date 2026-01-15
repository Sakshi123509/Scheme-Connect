import express from 'express';
import { applyForScheme, getMyApplications, getApplicationById, getAllApplications, updateApplicationStatus } from '../controllers/applicationController.js';
import authMiddleware from '../middleware/authmiddleware.js';
import adminMiddleware from '../middleware/adminmiddleware.js';

const router = express.Router();

// User routes
// Apply for scheme
router.post('/', authMiddleware, applyForScheme);
// Get logged-in user's applications
router.get('/my', authMiddleware, getMyApplications);
// Get single application by id (user can view)
router.get('/:id', authMiddleware, getApplicationById);

// admin 
// Get all applications
router.get('/', authMiddleware, adminMiddleware, getAllApplications);
// Approve / Reject application
router.put('/:id/status', authMiddleware, adminMiddleware, updateApplicationStatus);

export default router;