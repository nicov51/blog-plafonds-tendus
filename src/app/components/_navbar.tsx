import Link from "next/link";

export default function Navbar() {
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

                    <Link href="/admin" className="btn-outline-gold">
                        Admin
                    </Link>
                </div>
            </div>
        </nav>
    );
}
