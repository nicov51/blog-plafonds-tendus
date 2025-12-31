'use client';

import { useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import ArticleCard from '../components/ArticleCard';
import { CATEGORIES, Article, Category } from '@/types';

export default function ArticlesPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [hasLoaded, setHasLoaded] = useState(false);

    const fetchArticles = async (category: Category | null) => {
        setLoading(true);
        try {
            const url = category
                ? `/api/articles?category=${category}`
                : '/api/articles';

            const res = await fetch(url);
            const data = await res.json();

            if (data.success) {
                setArticles(data.data);
            }
            setHasLoaded(true);
        } catch (error) {
            console.error('Erreur chargement articles:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryClick = (category: Category | null) => {
        setSelectedCategory(category);
        fetchArticles(category);
    };

    // Premier chargement au clic
    if (!hasLoaded && !loading) {
        fetchArticles(null);
    }

    return (
        <div className="articles-page">
            {/* Hero */}
            <section className="articles-page__hero">
                <div className="container">
                    <h1>Blog Plafond Tendu</h1>
                    <p>Conseils, guides et inspirations pour vos projets</p>
                </div>
            </section>

            {/* Catégories */}
            <section className="articles-page__categories">
                <div className="container">
                    <button
                        className={`articles-page__reset-btn ${!selectedCategory ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(null)}
                    >
                        📋 Tous les articles
                    </button>

                    <div className="articles-page__category-grid">
                        {CATEGORIES.map((cat) => (
                            <div
                                key={cat.id}
                                onClick={() => handleCategoryClick(cat.id)}
                                className={selectedCategory === cat.id ? 'selected' : ''}
                            >
                                <CategoryCard
                                    title={cat.title}
                                    description={cat.description}
                                    icon={cat.icon}
                                    color={cat.color}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Articles */}
            <section className="articles-page__articles">
                <div className="container">
                    {loading ? (
                        <p className="articles-page__loading">⏳ Chargement...</p>
                    ) : articles.length === 0 ? (
                        <p className="articles-page__empty">Aucun article pour le moment.</p>
                    ) : (
                        <div className="articles-page__grid">
                            {articles.map((article) => (
                                <ArticleCard key={article._id} article={article} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
