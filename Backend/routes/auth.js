import express from 'express';
import { body } from 'express-validator';
import { signup, login, getProfile } from '../controllers/authcontroller.js';
import authMiddleware from '../middleware/authmiddleware.js';

const router = express.Router();

router.post('/signup', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('age').isNumeric().withMessage('Age is required'),
    body('income').isNumeric().withMessage('Income is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('gender').notEmpty().withMessage('Gender is required'),
    body('occupation').notEmpty().withMessage('Occupation is required')
], signup);

router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
], login);

router.get('/profile', authMiddleware, getProfile);

export default router;