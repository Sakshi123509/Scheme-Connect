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
        required: true
    },
    eligibility: {
        minAge: Number,
        maxAge: Number,
        minIncome: Number,
        maxIncome: Number,
        categories: [String], // e.g., ['SC', 'ST', 'OBC']
        locations: [String], // e.g., ['Maharashtra', 'Delhi']
        gender: [String], // ['Male', 'Female']
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
    department: {
        type: String,
        required: true
    },
    benefits: {
        type: String,
        required: true
    },
    deadline: {
        type: Date
    }
}, {
    timestamps: true
});

export default mongoose.model('Scheme', schemeSchema);
