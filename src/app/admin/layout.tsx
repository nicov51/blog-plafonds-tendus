import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin - Plafonds Tendus',
    robots: 'noindex, nofollow',
};

export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-logo">
                    <h2>⚙️ Admin</h2>
                </div>

                <nav className="admin-nav">
                    <Link href="/admin" className="admin-nav-link">
                        📊 Dashboard
                    </Link>
                    <Link href="/admin/articles" className="admin-nav-link">
                        📝 Articles
                    </Link>
                    <Link href="/admin/categories" className="admin-nav-link">
                        🏷️ Catégories
                    </Link>
                    <Link href="/" className="admin-nav-link">
                        🏠 Retour au site
                    </Link>
                </nav>
            </aside>

            {/* Contenu principal */}
            <main className="admin-main">
                {children}
            </main>
        </div>
    );
}

