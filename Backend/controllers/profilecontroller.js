import Profile from '../models/profile.js';

// Create or Update Profile
export const createUserProfile = async (req, res) => {
    try {
        console.log('📝 Creating/updating profile for user:', req.user._id);
        console.log('📊 Profile data:', req.body);

        // Check if profile already exists
        let profile = await Profile.findOne({ user: req.user._id });

        if (profile) {
            // Update existing profile
            console.log('🔄 Updating existing profile');
            profile = await Profile.findOneAndUpdate(
                { user: req.user._id },
                {
                    ...req.body, // Spread all incoming fields
                    user: req.user._id
                },
                { new: true, runValidators: true }
            );

            console.log('✅ Profile updated:', profile);
            return res.status(200).json({
                message: 'Profile updated successfully',
                profile
            });
        }

        // Create new profile
        console.log('✨ Creating new profile');
        profile = new Profile({
            user: req.user._id,
            age: req.body.age,
            income: req.body.income,
            category: req.body.category,
            location: req.body.location,
            state: req.body.state,
            gender: req.body.gender,
            occupation: req.body.occupation
        });

        await profile.save();
        console.log('✅ Profile saved:', profile);

        res.status(201).json({
            message: 'Profile created successfully',
            profile
        });
    } catch (error) {
        console.error('❌ Error creating/updating profile:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

// Get User Profile
export const getUserProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user._id });

        if (!profile) {
            console.log('⚠️ Profile not found for user:', req.user._id);
            return res.status(404).json({
                message: 'Profile not found'
            });
        }

        console.log('✅ Profile retrieved:', profile);
        res.status(200).json({
            message: 'Profile found',
            profile
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

// Update Profile separately (optional)
export const updateUserProfile = async (req, res) => {
    try {
        console.log('📝 Updating profile for user:', req.user._id);
        console.log('📊 Update data:', req.body);

        const profile = await Profile.findOneAndUpdate(
            { user: req.user._id },
            {
                ...req.body,
                user: req.user._id
            },
            { new: true, runValidators: true }
        );

        if (!profile) {
            console.log('Profile not found for update:', req.user._id);
            return res.status(404).json({
                message: 'Profile not found'
            });
        }

        console.log('✅ Profile updated:', profile);
        res.status(200).json({
            message: 'Profile updated successfully',
            profile
        });
    } catch (error) {
        console.error('❌ Error updating profile:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};
