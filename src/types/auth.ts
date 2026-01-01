import { DefaultSession } from 'next-auth';

// Étendre les types NextAuth par défaut
declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
        } & DefaultSession['user'];
    }

    interface User {
        id: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        sub: string;
    }
}

// Types pour ton app
export interface AuthUser {
    id: string;
    email: string;
    name: string | null;
    image: string | null;
}

export interface AuthSession {
    user: AuthUser;
    expires: string;
}

export interface AdminCheck {
    isAdmin: boolean;
    email: string;
}

