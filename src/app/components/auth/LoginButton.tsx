'use client';

import { signIn } from 'next-auth/react';

export default function LoginButton() {
    const handleLogin = () => {
        signIn('google', { callbackUrl: '/admin' });
    };

    return (
        <button onClick={handleLogin} className="btn-login">
            Se connecter avec Google
        </button>
    );
}
