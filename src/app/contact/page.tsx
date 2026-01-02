import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact | Nicolas Viennot - Plafonds Tendus Premium',
    description: 'Contactez-moi pour vos projets de plafonds tendus haut de gamme',
};

export default function ContactPage() {
    return (
        <div className="page-contact">
            <div className="container">
                <div className="contact-header">
                    <h1>Contactez-moi</h1>
                    <p className="subtitle">
                        Une question sur les plafonds tendus ? Un projet à discuter ? Je suis à votre écoute.
                    </p>
                </div>

                <div className="contact-grid">
                    {/* Infos de contact */}
                    <div className="contact-info">
                        <div className="info-card">
                            <div className="icon">🌐</div>
                            <h3>Site Web</h3>
                            <a href="https://www.nicolasviennot.fr" target="_blank" rel="noopener noreferrer">
                                www.nicolasviennot.fr
                            </a>
                            <p className="info-description">Demandez votre devis en ligne</p>
                        </div>

                        <div className="info-card">
                            <div className="icon">📧</div>
                            <h3>Email</h3>
                            <a href="mailto:nicolasviennot51@gmail.com">
                                nicolasviennot51@gmail.com
                            </a>
                        </div>

                        <div className="info-card">
                            <div className="icon">💼</div>
                            <h3>LinkedIn</h3>
                            <a href="https://www.linkedin.com/in/nicolas-viennot-7767632b0/" target="_blank" rel="noopener noreferrer">
                                Voir mon profil professionnel
                            </a>
                            <p className="info-description">Suivez mes actualités et projets</p>
                        </div>

                        <div className="info-card">
                            <div className="icon">📍</div>
                            <h3>Zone d'intervention</h3>
                            <p>Champagne-Ardenne et régions limitrophes</p>
                        </div>
                    </div>

                    {/* Message explicatif */}
                    <div className="contact-cta">
                        <div className="cta-card">
                            <h2>💡 Besoin d'un devis ?</h2>
                            <p>
                                Pour toute demande de devis personnalisé ou prise de rendez-vous,
                                rendez-vous ici:
                            </p>
                            <a
                                href="https://www.nicolasviennot.fr/devis"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-gold btn-large"
                            >
                                🚀 demander un devis
                            </a>
                        </div>

                        <div className="cta-card">
                            <h2>📬 Questions techniques ?</h2>
                            <p>
                                Pour des questions sur les articles de ce blog ou des conseils techniques,
                                contactez-moi directement par email :
                            </p>
                            <a
                                href="mailto:nicolasviennot51@gmail.com"
                                className="btn-outline-gold btn-large"
                            >
                                ✉️ Envoyer un email
                            </a>
                        </div>

                        <div className="cta-card">
                            <h2>🔗 Restons connectés</h2>
                            <p>
                                Suivez mes actualités, projets et conseils en plafonds tendus sur LinkedIn :
                            </p>
                            <a
                                href="https://www.linkedin.com/in/nicolas-viennot-7767632b0/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline-gold btn-large"
                            >
                                🤝 Me suivre sur LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

