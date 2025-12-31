import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import { Article } from '@/models/Article';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    await connectDB();

    const totalArticles = await Article.countDocuments();
    const publishedArticles = await Article.countDocuments({ published: true });
    const draftArticles = totalArticles - publishedArticles;

    return (
        <div className="admin-dashboard">
            <h1 className="admin-dashboard__title">📊 Dashboard</h1>

            <div className="admin-stats">
                <div className="admin-stats__card admin-stats__card--total">
                    <h3 className="admin-stats__label">Total articles</h3>
                    <p className="admin-stats__value">{totalArticles}</p>
                </div>

                <div className="admin-stats__card admin-stats__card--published">
                    <h3 className="admin-stats__label">Publiés</h3>
                    <p className="admin-stats__value">{publishedArticles}</p>
                </div>

                <div className="admin-stats__card admin-stats__card--draft">
                    <h3 className="admin-stats__label">Brouillons</h3>
                    <p className="admin-stats__value">{draftArticles}</p>
                </div>
            </div>

            <div className="admin-quick-actions">
                <h2 className="admin-quick-actions__title">Actions rapides</h2>
                <div className="admin-quick-actions__buttons">
                    <Link href="/admin/articles/new" className="btn-primary">
                        ➕ Nouvel article
                    </Link>
                    <Link href="/admin/articles" className="btn-secondary">
                        📝 Gérer les articles
                    </Link>
                </div>
            </div>
        </div>
    );
}

