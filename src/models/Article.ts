import mongoose, { Schema } from 'mongoose';

export interface IArticle {
    _id: string;
    title: string;
    slug: string;
    metaDescription: string;
    content: string;
    image: {
        url: string;        // URL publique de l image
        publicId: string;   // ID Cloudinary pour pouvoir la supprimer
    };
    author: {
        name: string;
        email: string;
    };
    tags: string[];
    category?: string;
    published: boolean;
    views: number;
    likesCount: number;
    createdAt: Date;
    updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },
        metaDescription: {
            type: String,
            required: true,
            maxlength: 160,
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            url: {
                type: String,
                required: true,
            },
            publicId: {
                type: String,
                required: true,
            },
        },
        author: {
            name: {
                type: String,
                default: 'Nicolas V',
            },
            email: String,
        },
        tags: {
            type: [String],
            default: [],
        },
        category: String,
        published: {
            type: Boolean,
            default: false,
        },
        views: {
            type: Number,
            default: 0,
        },
        likesCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Index pour recherche
ArticleSchema.index({ title: 'text', content: 'text' });

export const Article = mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

