import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
    // SEO
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    metaDescription: { type: String, required: true, maxlength: 160 },

    // Catégories (embedded)
    category: {
        type: String,
        required: true,
        enum: ['plafonds-tendus', 'renovation', 'conseils', 'realisations'],
        index: true
    },
    tags: [{ type: String }], // Ex: ['barrisol', 'eclairage', 'moderne']

    // Contenu
    content: { type: String, required: true },
    excerpt: { type: String, required: true, maxlength: 200 }, // Pour les previews
    imageUrl: { type: String, required: true },
    imageAlt: { type: String, required: true },

    // Liens externes (pour backlinks)
    externalLinks: [{
        url: String,
        anchor: String,
        nofollow: { type: Boolean, default: false }
    }],

    // Métadonnées
    author: { type: String, default: 'Nicolas Viennot' },
    publishedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

    // Analytics (OBLIGATOIRE)
    views: { type: Number, default: 0, required: true },
    likesCount: { type: Number, default: 0 }, // Compteur dénormalisé

    // Statut
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft',
        index: true
    },

    // Partages sociaux (tracking)
    shares: {
        linkedin: { type: Number, default: 0 },
        twitter: { type: Number, default: 0 },
        facebook: { type: Number, default: 0 }
    }
}, {
    timestamps: true // Ajoute createdAt et updatedAt automatiquement
});

// Index pour recherche full-text
ArticleSchema.index({ title: 'text', content: 'text', excerpt: 'text' });

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema);
