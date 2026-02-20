import express from 'express';
import {
    getAllSchemes,
    getSchemeById,
    createScheme,
    updateScheme,
    deleteScheme,
    SearchSchemes
} from '../controllers/schemecontroller.js';
import authMiddleware from '../middleware/authmiddleware.js';
import adminMiddleware from '../middleware/adminmiddleware.js';

const router = express.Router();

//public routes user can see schemes without login
router.get('/', getAllSchemes);
router.get('/:id', getSchemeById);
router.get('/search/:query', SearchSchemes);

//for admin only
router.post('/', authMiddleware, adminMiddleware, createScheme);
router.put('/:id', authMiddleware, adminMiddleware, updateScheme);
router.delete('/:id', authMiddleware, adminMiddleware, deleteScheme);

export default router;