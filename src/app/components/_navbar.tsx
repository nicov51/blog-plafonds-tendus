"use client";

import Link from "next/link";
import {signOut, useSession} from "next-auth/react";

export default function Navbar() {

    const { data: session } = useSession();
    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar__content">
                    <Link href="/" className="navbar__logo">
                        <span>✦</span>
                        Plafonds Premium
                    </Link>

                    <ul className="navbar__links">
                        <li><Link href="/">Accueil</Link></li>
                        <li><Link href="/articles">Articles</Link></li>
                        <li><Link href="/about">À propos</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>

                    <div className="navbar__auth">
                        { session ? (
                            <>
                                <Link href="/admin" className="btn-outline-gold">
                                    📊 Admin
                                </Link>
                                <Link
                                    href="https://cloudinary.com/console"
                                    target="_blank"
                                    className="btn-outline-gold"
                                >
                                    ☁️ Cloudinary
                                </Link>
                                <button
                                    onClick={() => signOut({callbackUrl: '/'})}
                                    className="btn-outline-gold"
                                >
                                    🚪 Déconnexion
                                </button>

                            </>
                        ) : (
                            <Link href="/admin" className="btn-outline-gold">
                                Admin
                            </Link>
                        )}
                    </div>


                </div>
            </div>
        </nav>
    );
}
