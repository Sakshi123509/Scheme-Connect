import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema({
    schemeName: {
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
    eligibility: {
        minAge: Number,
        maxAge: Number,
        minIncome: Number,
        maxIncome: Number,
        categories: {
            type: [String],
            enum: ['General', 'SC', 'ST', 'OBC', 'Minority']
        },
        locations: [String],
        gender: {
            type: [String],
            enum: ['Male', 'Female', 'Other']
        },
        occupation: [String]
    },
    applicationFormUrl: {
        type: String, // URL to downloadable form
        required: true
    },
    youtubeLink: {
        type: String, // YouTube video link
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
    ,
    deadline: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Scheme', schemeSchema);
