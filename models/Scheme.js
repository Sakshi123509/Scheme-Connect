import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Education', 'Health', 'Employment', 'Women', 'Housing'],
        required: true
    },
    ministry: {
        type: String,
        trim: true
    },
    
    // Arrays for details
    eligibility: [String],
    benefits: [String],
    documents: [String],
    applicationProcess: [String],
    
    // IMPORTANT: Dynamic links
    applicationFormUrl: {
        type: String,
        required: true,
        trim: true
    },
    youtubeLink: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    helpline: {
        type: String,
        trim: true
    },
    
    // Image (can be URL or uploaded)
    image: {
        type: String,
        trim: true
    },
    
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    
    // Optional fields
    budget: String,
    beneficiaries: String,
    deadline: String,
    
    // For matching with user profile
    eligibilityCriteria: {
        minAge: Number,
        maxAge: Number,
        minIncome: Number,
        maxIncome: Number,
        categories: [String],
        gender: [String],
        states: [String],
        occupation: [String]
    }
}, {
    timestamps: true
});

export default mongoose.model('Scheme', schemeSchema);