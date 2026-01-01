'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { articleService } from '@/services/articleService';
import ImageUpload from './ImageUpload';

interface FormData {
    title: string;
    slug: string;
    content: string;
    metaDescription: string;
    image?: { url: string; publicId: string };
}

export default function ArticleEditor() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<FormData>({
        title: '',
        slug: '',
        content: '',
        metaDescription: '',
    });

    const handleTitleChange = (title: string) => {
        setForm(prev => ({
            ...prev,
            title,
            slug: articleService.generateSlug(title)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.image) return alert('Image requise');

        setLoading(true);
        try {
            await articleService.create(form as Required<FormData>);
            alert('Article créé');
            router.push('/admin/articles');
        } catch {
            alert('Erreur');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="article-form">
            <div className="form-field">
                <label>Titre *</label>
                <input
                    type="text"
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    required
                />
            </div>

            <div className="form-field">
                <label>Slug</label>
                <input type="text" value={form.slug} readOnly />
            </div>

            <div className="form-field">
                <label>Meta (160 car max)</label>
                <textarea
                    value={form.metaDescription}
                    onChange={(e) => setForm(prev => ({ ...prev, metaDescription: e.target.value }))}
                    maxLength={160}
                    rows={2}
                />
                <span>{form.metaDescription.length}/160</span>
            </div>

            <div className="form-field">
                <label>Image *</label>
                <ImageUpload
                    value={form.image}
                    onChange={(image) => setForm(prev => ({ ...prev, image }))}
                />
            </div>

            <div className="form-field">
                <label>Contenu *</label>
                <textarea
                    value={form.content}
                    onChange={(e) => setForm(prev => ({ ...prev, content: e.target.value }))}
                    rows={15}
                    required
                />
            </div>

            <div className="form-actions">
                <button type="button" onClick={() => router.back()}>Annuler</button>
                <button type="submit" disabled={loading}>
                    {loading ? '⏳' : '✅ Créer'}
                </button>
            </div>
        </form>
    );
}





