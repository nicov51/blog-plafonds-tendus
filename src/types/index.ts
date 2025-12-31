// Gestion erreurs
export interface ApiError {
    message: string;
    code?: string;
    statusCode?: number;
}

export function isError(error: unknown): error is Error {
    return error instanceof Error;
}

export function getErrorMessage(error: unknown): string {
    if (isError(error)) {
        return error.message;
    }
    if (typeof error === 'string') {
        return error;
    }
    return 'Une erreur inconnue est survenue';
}

// typage des articles
export type Category = 'technique' | 'projets' | 'inspiration' | 'conseils';

export interface CategoryInfo {
    id: Category;
    title: string;
    description: string;
    icon: string;
    color: string;
}

export interface Article {
    _id: string;
    title: string;
    slug: string;
    content: string;
    metaDescription: string;
    category: Category;
    image: {
        url: string;
        publicId: string;
        alt?: string;
    };
    author: {
        name: string;
        email?: string;
    };
    tags: string[];
    published: boolean;
    views: number;
    likesCount: number;
    createdAt: string;
    updatedAt: string;
}

// Liste des catégories
export const CATEGORIES: CategoryInfo[] = [
    {
        id: 'technique',
        title: 'Technique & Pose',
        description: 'Conseils installation, outils, méthodes professionnelles',
        icon: '🔧',
        color: '#3b82f6',
    },
    {
        id: 'projets',
        title: 'Cas d\'Utilisation',
        description: 'Exemples de projets : cuisine, salle de bain, bureau...',
        icon: '🏠',
        color: '#10b981',
    },
    {
        id: 'inspiration',
        title: 'Inspiration & Design',
        description: 'Tendances, couleurs, styles de décoration',
        icon: '💡',
        color: '#f59e0b',
    },
    {
        id: 'conseils',
        title: 'Conseils & Entretien',
        description: 'Maintenance, nettoyage, FAQ clients',
        icon: '📚',
        color: '#8b5cf6',
    },
];

