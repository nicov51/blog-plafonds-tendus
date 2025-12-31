'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from './ImageUpload';
import TiptapEditor from './TiptapEditor';

interface ArticleData {
    title: string;
    slug: string;
    content: string;
    metaDescription: string;
    category: string;
    tags: string[];
    image?: { url: string; publicId: string; alt: string };
    published: boolean;
}

interface ArticleEditorProps {
    initialData?: Partial<ArticleData>;
    mode: 'create' | 'edit';
}

const CATEGORIES = ['conseils', 'realisations', 'tendances', 'techniques'];

export default function ArticleEditor({ initialData, mode }: ArticleEditorProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<ArticleData>({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        content: initialData?.content || '',
        metaDescription: initialData?.metaDescription || '',
        category: initialData?.category || 'conseils',
        tags: initialData?.tags || [],
        image: initialData?.image,
        published: initialData?.published ?? false,
    });

    const [tagInput, setTagInput] = useState('');

    const handleTitleChange = (title: string) => {
        setFormData(prev => ({
            ...prev,
            title,
            slug: mode === 'create' ? title
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '') : prev.slug
        }));
    };

    const addTag = () => {
        if (tagInput && !formData.tags.includes(tagInput)) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, tagInput]
            }));
            setTagInput('');
        }
    };

    const removeTag = (tag: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(t => t !== tag)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = mode === 'create'
                ? '/api/articles'
                : `/api/articles/${initialData?.slug}`;

            const method = mode === 'create' ? 'POST' : 'PUT';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    author: {
                        name: 'Équipe Plafond Tendu Pro',
                        email: 'contact@plafondtendu.fr'
                    }
                }),
            });

            const data = await res.json();

            if (data.success) {
                alert(mode === 'create' ? 'Article créé !' : 'Article mis à jour !');
                router.push('/admin/articles');
                router.refresh();
            } else {
                alert('Erreur : ' + data.message);
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la sauvegarde');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="article-editor">
            {/* Titre */}
            <div className="article-editor__group">
                <label className="article-editor__label">Titre de l&apos;article *</label>
                <input
                    type="text"
                    className="article-editor__input"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    required
                    placeholder="Ex: Les avantages du plafond tendu"
                />
            </div>

            {/* Slug */}
            <div className="article-editor__group">
                <label className="article-editor__label">Slug (URL) *</label>
                <input
                    type="text"
                    className="article-editor__input"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({...prev, slug: e.target.value}))}
                    required
                    placeholder="avantages-plafond-tendu"
                />
                <small className="article-editor__hint">URL: /articles/{formData.slug}</small>
            </div>

            {/* Image */}
            <div className="article-editor__group">
                <label className="article-editor__label">Image de couverture</label>
                <ImageUpload
                    currentImage={formData.image}
                    onImageUploaded={(image) => setFormData(prev => ({...prev, image}))}
                />
            </div>

            {/* Catégorie */}
            <div className="article-editor__group">
                <label className="article-editor__label">Catégorie *</label>
                <select
                    className="article-editor__select"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({...prev, category: e.target.value}))}
                    required
                >
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {/* Tags */}
            <div className="article-editor__group">
                <label className="article-editor__label">Tags</label>
                <div className="article-editor__tags">
                    {formData.tags.map(tag => (
                        <span
                            key={tag}
                            className="article-editor__tag"
                            onClick={() => removeTag(tag)}
                        >
                            {tag} ✕
                        </span>
                    ))}
                </div>
                <div className="article-editor__tag-input">
                    <input
                        type="text"
                        className="article-editor__input"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                addTag();
                            }
                        }}
                        placeholder="Ajouter un tag (Entrée pour valider)"
                    />
                    <button type="button" onClick={addTag} className="btn-secondary">
                        +
                    </button>
                </div>
            </div>

            {/* Meta Description */}
            <div className="article-editor__group">
                <label className="article-editor__label">Meta Description (SEO) *</label>
                <textarea
                    className="article-editor__textarea"
                    value={formData.metaDescription}
                    onChange={(e) => setFormData(prev => ({...prev, metaDescription: e.target.value}))}
                    required
                    rows={3}
                    placeholder="Description pour les moteurs de recherche (max 160 caractères)"
                    maxLength={160}
                />
                <small className="article-editor__hint">
                    {formData.metaDescription.length}/160 caractères
                </small>
            </div>

            {/* Contenu */}
            <div className="article-editor__group">
                <label className="article-editor__label">Contenu de l&apos;article *</label>
                <TiptapEditor
                    content={formData.content}
                    onChange={(content) => setFormData(prev => ({...prev, content}))}
                />
            </div>

            {/* Publié */}
            <div className="article-editor__group article-editor__group--checkbox">
                <label className="article-editor__checkbox">
                    <input
                        type="checkbox"
                        checked={formData.published}
                        onChange={(e) => setFormData(prev => ({...prev, published: e.target.checked}))}
                    />
                    <span>Publier l&apos;article immédiatement</span>
                </label>
            </div>

            {/* Actions */}
            <div className="article-editor__actions">
                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Sauvegarde...' : (mode === 'create' ? '✅ Créer l\'article' : '💾 Mettre à jour')}
                </button>
                <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => router.push('/admin/articles')}
                >
                    Annuler
                </button>
            </div>
        </form>
    );
}

