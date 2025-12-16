import express from 'express';
import {
    getAllSchemes,
    getSchemeById,
    createScheme,
    updateScheme,
    deleteScheme,
    searchSchemes,
    getEligibleSchemes
} from '../controllers/schemecontroller.js';
import authMiddleware from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/', getAllSchemes);
router.get('/search', searchSchemes);
router.get('/eligible', authMiddleware, getEligibleSchemes);
router.get('/:id', getSchemeById);
router.post('/', createScheme); // Admin only, but for now no auth
router.put('/:id', updateScheme);
router.delete('/:id', deleteScheme);

export default router;