interface ShareLinksParams {
    title: string;
    slug: string;
    excerpt: string;
}

interface ShareLinks {
    linkedin: string;
    twitter: string;
    facebook: string;
    email: string;
}

export function generateShareLinks(article: ShareLinksParams): ShareLinks {
    // Récupère l'URL depuis .env
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!baseUrl) {
        throw new Error(' NEXT_PUBLIC_APP_URL manquant dans .env.local');
    }

    const url = `${baseUrl}/blog/${article.slug}`;
    const text = `${article.title} - ${article.excerpt}`;

    return {
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        email: `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(url)}`
    };
}

