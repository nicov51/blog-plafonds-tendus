import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Email admin autorisé (à mettre dans .env en production)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ton-email@gmail.com';

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    // Forcer la sélection de compte à chaque connexion
                    prompt: 'select_account',
                },
            },
        }),
    ],

    callbacks: {
        /**
         * Vérifie si l'utilisateur est autorisé à se connecter
         * Seul l'email admin peut accéder
         */
        async signIn({ user }) {
            if (!user.email) return false;
            return user.email === ADMIN_EMAIL;
        },

        /**
         * Ajoute les infos utilisateur au token JWT
         */
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        },

        /**
         * Transmet les infos du token à la session
         */
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub;
            }

            return session;
        },
    },

    pages: {
        signIn: '/auth/signin',      // Page de connexion custom
        error: '/auth/error',         // Page d'erreur custom
    },

    session: {
        strategy: 'jwt',              // Utilisation de JWT (pas de DB session)
        maxAge: 24 * 60 * 60,        // Session expire après 24h
    },

    secret: process.env.NEXTAUTH_SECRET,
};
