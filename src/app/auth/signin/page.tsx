"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/admin";

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>🔐 Connexion Admin</h1>
                <p>Réservé aux administrateurs</p>

                <button
                    onClick={() => signIn("google", { callbackUrl })}
                    className="btn-google"
                >
                    <span className="google-icon">G</span>
                    Se connecter avec Google
                </button>
            </div>
        </div>
    );
}
