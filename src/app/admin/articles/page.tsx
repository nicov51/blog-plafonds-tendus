import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import { Article } from '@/models/Article';

export const dynamic = 'force-dynamic';

export default async function AdminArticlesPage() {
    await connectDB();
    const articles = await Article.find({})
        .sort({ createdAt: -1 })
        .lean();

    return (
        <div className="admin-articles">
            <div className="admin-articles__header">
                <h1>Gestion des articles</h1>
                <Link href="/admin/articles/new" className="btn-primary">
                    ➕ Nouvel article
                </Link>
            </div>

            <div className="admin-articles__list">
                {articles.length === 0 ? (
                    <p className="admin-articles__empty">Aucun article pour le moment.</p>
                ) : (
                    <table className="admin-table">
                        <thead className="admin-table__head">
                        <tr>
                            <th>Titre</th>
                            <th>Catégorie</th>
                            <th>Date</th>
                            <th>Statut</th>
                            <th className="admin-table__actions">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="admin-table__body">
                        {articles.map((article) => (
                            <tr key={String(article._id)}>
                                <td className="admin-table__title">{article.title}</td>
                                <td>
                                        <span className="admin-badge">
                                            {article.category}
                                        </span>
                                </td>
                                <td className="admin-table__date">
                                    {new Date(article.createdAt).toLocaleDateString('fr-FR')}
                                </td>
                                <td className="admin-table__status">
                                    {article.published ? (
                                        <span className="admin-status admin-status--published">
                                                ✅ Publié
                                            </span>
                                    ) : (
                                        <span className="admin-status admin-status--draft">
                                                📝 Brouillon
                                            </span>
                                    )}
                                </td>
                                <td className="admin-table__actions">
                                    <Link
                                        href={`/admin/articles/${article.slug}/edit`}
                                        className="admin-link"
                                    >
                                        ✏️ Éditer
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
