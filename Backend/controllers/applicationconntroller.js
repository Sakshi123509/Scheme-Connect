import Application from '../models/Application.js';
import Scheme from '../models/scheme.js';

export const applyForScheme = async (req, res) => {
    try {
        const { schemeId, applicationData } = req.body;
        const userId = req.user._id;

        // Check if scheme exists
        const scheme = await Scheme.findById(schemeId);
        if (!scheme) {
            return res.status(404).json({ message: 'Scheme not found' });
        }

        // Check if already applied
        const existingApplication = await Application.findOne({ user: userId, scheme: schemeId });
        if (existingApplication) {
            return res.status(400).json({ message: 'Already applied for this scheme' });
        }

        const application = new Application({
            user: userId,
            scheme: schemeId,
            applicationData
        });

        await application.save();
        await application.populate('scheme');

        res.status(201).json({
            message: 'Application submitted successfully',
            application
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getUserApplications = async (req, res) => {
    try {
        const applications = await Application.find({ user: req.user._id })
            .populate('scheme')
            .sort({ createdAt: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id)
            .populate('user', 'name email')
            .populate('scheme');
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.json(application);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate('scheme');
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.json(application);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
