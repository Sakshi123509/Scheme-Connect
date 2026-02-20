import Profile from '../models/Profile.js';

//create profile controller
export const createUserProfile = async (req, res) => {
    try {
        const existingProfile = await Profile.findOne({ user: req.user._id });
        if (existingProfile) {
            return res.status(400).json({ message: 'Profile already exists' });
        }
        const user = new Profile({
            user: req.user._id,
            age: req.body.age,
            income: req.body.income,
            category: req.body.category,
            location: req.body.location,
            state: req.body.state,
            gender: req.body.gender,
            occupation: req.body.occupation,
        });
        await user.save();
        res.status(201).json({ message: 'Profile created successfully', user });
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
}

//get profile controller
export const getUserProfile = async (req, res) => {
    try {
        const userprofile = await Profile.findOne({ user: req.user._id });
        if (!userprofile) {
            return res.status(404).json({ message: "profile Not found" });
        }
        res.status(200).json({ message: "profile found", userprofile });
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
};


//update profile controller
export const updateUserProfile = async (req, res) => {
    try {
        const updateprofile = await Profile.findOneAndUpdate({ user: req.user._id }, {
            age: req.body.age,
            income: req.body.income,
            category: req.body.category,
            location: req.body.location,
            state: req.body.state,
            gender: req.body.gender,
            occupation: req.body.occupation,
        }, { new: true, runValidators: true });
        if (!updateprofile) {
            return res.status(404).json({ message: "profile Not found" });
        }
        res.status(200).json({ message: "profile updated", updateprofile });
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
}
