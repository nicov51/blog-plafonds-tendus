import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__grid">
                    {/* Colonne 1 : À propos */}
                    <div className="footer__section">
                        <h3 className="footer__title">Plafonds Premium</h3>
                        <p className="footer__text">
                            Spécialiste des plafonds tendus .
                            Innovation, confort et esthétique depuis 2009.
                        </p>
                    </div>

                    {/* Colonne 2 : Navigation */}
                    <div className="footer__section">
                        <h3 className="footer__title">Navigation</h3>
                        <ul className="footer__links">
                            <li><Link href="/">Accueil</Link></li>
                            <li><Link href="/articles">Articles</Link></li>
                            <li><Link href="/realisations">Réalisations</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Colonne 3 : Légal */}
                    <div className="footer__section">
                        <h3 className="footer__title">Informations légales</h3>
                        <ul className="footer__links">
                            <li><Link href="/mentions-legales">Mentions légales</Link></li>
                            <li><Link href="/politique-confidentialite">Politique de confidentialité</Link></li>
                            <li><Link href="/cgv">CGV</Link></li>
                            <li><Link href="/cookies">Gestion des cookies</Link></li>
                        </ul>
                    </div>

                    {/* Colonne 4 : Contact & Réseaux */}
                    <div className="footer__section">
                        <h3 className="footer__title">Nous suivre</h3>
                        <ul className="footer__social">
                            <li>
                                <a href="https://linkedin.com/company/votre-page" target="_blank" rel="noopener noreferrer">
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a href="https://facebook.com/votre-page" target="_blank" rel="noopener noreferrer">
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://instagram.com/votre-page" target="_blank" rel="noopener noreferrer">
                                    Instagram
                                </a>
                            </li>
                        </ul>
                        <p className="footer__contact">
                            📧 contact@plafonds-premium.fr<br />
                            📞 +33 1 23 45 67 89
                        </p>
                    </div>
                </div>

                {/* Ligne de copyright */}
                <div className="footer__bottom">
                    <p>Plafonds Premium. Tous droits réservés.</p>
                    <p>
                        Site réalisé avec 💛 par mes soins
                        <a href="https://votre-portfolio.com" target="_blank" rel="noopener">
                            Votre Nomme
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
