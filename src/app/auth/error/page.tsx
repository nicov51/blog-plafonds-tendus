"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AuthErrorPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");

    const errorMessages: Record<string, string> = {
        AccessDenied: "⛔ Accès refusé - Email non autorisé",
        Configuration: "⚙️ Erreur de configuration",
        Verification: "✉️ Token de vérification invalide",
        Default: "❌ Erreur d'authentification",
    };

    const message = errorMessages[error || "Default"];

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>{message}</h1>
                <p>Seul un administrateur peut se connecter.</p>

                <Link href="/" className="btn-google">
                    🏠 Retour accueil
                </Link>
            </div>
        </div>
    );
}
