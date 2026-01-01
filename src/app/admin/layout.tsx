import Link from 'next/link';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import LogoutButton from '../components/auth/LogoutButton';
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/config";
import React from "react";

export const metadata: Metadata = {
    title: 'Admin - Plafonds Tendus',
    robots: 'noindex, nofollow',
};

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {

    // ✅ Vérification avec NextAuth directement
    const session = await getServerSession(authOptions);

    // Vérifie si connecté ET si c'est l'admin
    if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
        redirect('/api/auth/signin?callbackUrl=/admin');
    }

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-logo">
                    <h2>Admin</h2>
                </div>

                <nav className="admin-nav">
                    <Link href="/admin" className="admin-nav-link">
                        Dashboard
                    </Link>
                    <Link href="/admin/articles" className="admin-nav-link">
                        Articles
                    </Link>
                    <Link href="/admin/categories" className="admin-nav-link">
                        Catégories
                    </Link>
                    <Link href="/" className="admin-nav-link">
                        Retour au site
                    </Link>

                    <div className="admin-nav-footer">
                        <LogoutButton />
                    </div>
                </nav>
            </aside>

            <main className="admin-main">
                {children}
            </main>
        </div>
    );
}


