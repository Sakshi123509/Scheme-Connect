import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    scheme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scheme',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    applicationData: {
        type: Map,
        of: String // Flexible data for form fields
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.model('Application', applicationSchema);
