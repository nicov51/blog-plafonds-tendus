import ArticleEditor from '@/app/components/admin/ArticleEditor';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Nouvel article - Admin',
};

export default function NewArticlePage() {
    return (
        <div>
            <div className="admin-header">
                <h1>Créer un nouvel article</h1>
                <p>Rédigez et publiez un nouvel article pour votre blog</p>
            </div>

            <ArticleEditor  mode={"create"} />
        </div>
    );
}
