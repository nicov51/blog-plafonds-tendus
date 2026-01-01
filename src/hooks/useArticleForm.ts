import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArticleFormData, ImageData } from '@/types/article';

interface UseArticleFormProps {
    mode: 'create' | 'edit';
    initialData?: Partial<ArticleFormData>;
}

export function useArticleForm({ mode, initialData }: UseArticleFormProps) {
    const router = useRouter();

    const [formData, setFormData] = useState<ArticleFormData>({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        excerpt: initialData?.excerpt || '',
        content: initialData?.content || '',
        coverImage: initialData?.coverImage || null,
        category: initialData?.category || '',
        tags: initialData?.tags || [],
        published: initialData?.published || false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const updateField = (field: keyof ArticleFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const updateTitle = (title: string) => {
        const slug = title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        setFormData(prev => ({ ...prev, title, slug }));
    };

    const updateTags = (tagsString: string) => {
        const tags = tagsString
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);

        setFormData(prev => ({ ...prev, tags }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            if (!formData.coverImage) {
                throw new Error('Image de couverture requise');
            }

            const payload = {
                ...formData,
                coverImage: formData.coverImage.url,
                coverImagePublicId: formData.coverImage.publicId,
            };

            const url = mode === 'create'
                ? '/api/articles'
                : `/api/articles/${initialData?.slug}`;

            const method = mode === 'create' ? 'POST' : 'PUT';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Erreur lors de la sauvegarde');
            }

            router.push('/admin/articles');
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur inconnue');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        isSubmitting,
        error,
        updateField,
        updateTitle,
        updateTags,
        handleSubmit,
    };
}
