import mongoose from 'mongoose';

const LikeSchema = new mongoose.Schema({
    articleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: true,
        index: true
    },
    ipAddress: { type: String, required: true }, // Pour éviter likes multiples
    userAgent: String,
    createdAt: { type: Date, default: Date.now, expires: '90d' } // Auto-suppression après 90j
});

// Index composite pour éviter doublons
LikeSchema.index({ articleId: 1, ipAddress: 1 }, { unique: true });

export default mongoose.models.Like || mongoose.model('Like', LikeSchema);
