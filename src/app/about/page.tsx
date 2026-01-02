import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'À propos | Nicolas Viennot',
    description: 'Découvrez mon parcours et mon expertise en plafonds tendus premium',
};

export default function AboutPage() {
    return (
        <div className="page-about">
            <div className="container">
                {/* En-tête */}
                <div className="about-header">
                    <h1>À propos de moi</h1>
                    <p className="subtitle">
                        Passionné par la renovation en général, et par la grande diversité des solutions offertes
                        par la toile tendue en particulier.
                    </p>
                </div>

                {/* Section principale */}
                <div className="about-content">
                    <div className="about-intro">
                        <div className="intro-text">
                            <h2>Nicolas Viennot</h2>
                            <p className="lead">
                                Expert en plafonds tendus avec une approche technique et esthétique unique.
                            </p>
                            <p>
                                Fort d une expérience solide dans le domaine, je me spécialise dans
                                l'installation de plafonds tendus, alliant savoir-faire
                                technique et sens du détail.
                            </p>
                            <p>
                                Mes objectifs : transformer vos espaces avec des solutions sur mesure,
                                durables et esthétiquement parfaites.
                                Faire connaitre cette solution qui est souvent le meilleur rapport qualité/prix
                                En finir avec les idées reçues infondées...
                            </p>
                        </div>

                        <div className="intro-image">
                            {/* Remplace par ta vraie photo */}
                            <div className="placeholder-image">
                                <span>📸</span>
                                <p>Votre photo ici</p>
                            </div>
                        </div>
                    </div>

                    {/* Points forts */}
                    <div className="strengths">
                        <h2>Mes points forts</h2>
                        <div className="strengths-grid">
                            <div className="strength-card">
                                <div className="icon">🎯</div>
                                <h3>Précision technique</h3>
                                <p>
                                    Maîtrise parfaite des techniques de pose et attention
                                    méticuleuse aux détails
                                </p>
                            </div>

                            <div className="strength-card">
                                <div className="icon">✨</div>
                                <h3>Qualité premium</h3>
                                <p>
                                    Utilisation exclusive de matériaux de qualité pour
                                    un résultat durable
                                </p>
                            </div>

                            <div className="strength-card">
                                <div className="icon">💡</div>
                                <h3>Conseil personnalisé</h3>
                                <p>
                                    Accompagnement pour trouver la solution
                                    adaptée à votre projet
                                </p>
                            </div>

                            <div className="strength-card">
                                <div className="icon">🚀</div>
                                <h3>Innovation</h3>
                                <p>
                                    Veille constante sur les nouvelles techniques et
                                    tendances du marché
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Certifications / Compétences */}
                    <div className="skills">
                        <h2>Expertises</h2>
                        <ul className="skills-list">
                            <li>✓ Plafonds tendus acoustiques</li>
                            <li>✓ Plafonds imprimés personnalisés</li>
                            <li>✓ Intégration éclairage et autres...</li>
                            <li>✓ Plafonds translucides rétroéclairés</li>
                            <li>✓ Rénovation et restauration</li>
                            <li>✓ Projets résidentiels et commerciaux</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
