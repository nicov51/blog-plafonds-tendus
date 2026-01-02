interface ArticleData {
    title: string;
    slug: string;
    content: string;
    metaDescription: string;
    image: { url: string; publicId: string };
}

export const articleService = {
    async create(data: ArticleData) {
        const res = await fetch('/api/articles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error('Creation failed');
        return res.json();
    },

    generateSlug(title: string): string {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
};
