import express from 'express';
import {
    applyForScheme,
    getUserApplications,
    getApplicationById,
    updateApplicationStatus
} from '../controllers/applicationconntroller.js';
import authMiddleware from '../middleware/authmiddleware.js';

const router = express.Router();

router.post('/apply', authMiddleware, applyForScheme);
router.get('/my', authMiddleware, getUserApplications);
router.get('/:id', getApplicationById);
router.put('/:id/status', updateApplicationStatus); // Admin only

export default router;