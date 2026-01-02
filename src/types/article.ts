export interface ImageData {
    url: string;
    publicId: string;
    alt?: string;
}

export interface ArticleFormData {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: ImageData | null;
    category: string;
    tags: string[];
    published: boolean;
}

export interface Article extends ArticleFormData {
    _id: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    views: number;
}
