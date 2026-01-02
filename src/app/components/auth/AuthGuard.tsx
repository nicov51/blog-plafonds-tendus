'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

interface AuthGuardProps {
    children: React.ReactNode;
}

/**
 * Protection côté client avec redirection immédiate
 * Utilise le status de la session
 */
export default function AuthGuard({ children }: AuthGuardProps) {
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/auth/signin');
        },
    });

    // Chargement en cours
    if (status === 'loading') {
        return <div className="auth-loading">Vérification...</div>;
    }

    // Authentifié
    return <>{children}</>;
}
