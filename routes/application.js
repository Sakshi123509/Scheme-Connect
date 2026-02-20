import express from 'express';
import Application from '../models/Application.js';
import authMiddleware from '../middleware/authmiddleware.js';

const router = express.Router();

// Save scheme (bookmark)
router.post('/save', authMiddleware, async (req, res) => {
    try {
        const { schemeId } = req.body;
        
        // Check if already saved
        const existing = await Application.findOne({
            user: req.user._id,
            scheme: schemeId
        });
        
        if (existing) {
            return res.status(400).json({ message: 'Already saved' });
        }
        
        const application = new Application({
            user: req.user._id,
            scheme: schemeId,
            status: 'Saved'
        });
        
        await application.save();
        res.status(201).json({ message: 'Scheme saved', application });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Apply for scheme
router.post('/apply', authMiddleware, async (req, res) => {
    try {
        const { schemeId } = req.body;
        
        const application = await Application.findOneAndUpdate(
            { user: req.user._id, scheme: schemeId },
            { status: 'Applied', appliedDate: new Date() },
            { new: true, upsert: true }
        );
        
        res.json({ message: 'Applied successfully', application });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get user's applications
router.get('/my', authMiddleware, async (req, res) => {
    try {
        const applications = await Application.find({ user: req.user._id })
            .populate('scheme')
            .sort({ createdAt: -1 });
        
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;