import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    age: {
        type: Number,
        required: true
    },
    income: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['General', 'SC', 'ST', 'OBC', 'Minority'],
        default: 'General'
    },
    location: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);

