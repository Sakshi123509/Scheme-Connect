import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    scheme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scheme',
        required: true
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
}, { timestamps: true });

export default mongoose.model("Application", applicationSchema);