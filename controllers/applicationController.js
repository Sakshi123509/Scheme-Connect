
import Application from '../models/Application.js';
import Scheme from '../models/scheme.js';
import Profile from '../models/Profile.js';

export const applyForScheme = async (req, res) => {
    try {
        const { schemeId } = req.body;

        // check scheme exists
        const scheme = await Scheme.findById(schemeId);
        if (!scheme) {
            return res.status(404).json({ message: 'Scheme not found' });
        }

        // get profile of logged-in user
        const profile = await Profile.findOne({ user: req.user._id });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // check already applied
        const existingApplication = await Application.findOne({
            scheme: schemeId,
            profile: profile._id
        });

        if (existingApplication) {
            return res.status(400).json({ message: 'Already applied for this scheme' });
        }

        //create application
        const application = new Application({
            scheme: schemeId,
            profile: profile._id
        });

        await application.save();

        res.status(201).json({
            message: 'Application submitted successfully',
            application
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getMyApplications = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user._id });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        const applications = await Application.find({ profile: profile._id })
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
            .populate({
                path: 'profile',
                populate: {
                    path: 'user',
                    select: 'name email'
                }
            })
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


//admin only - get all applications
export const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find()
            .populate({
                path: 'profile',
                populate: {
                    path: 'user',
                    select: 'name email'
                }
            })
            .populate('scheme')
            .sort({ createdAt: -1 });

        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
