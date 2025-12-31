import Link from "next/link";

export default function _Hero() {
    return (
        <section className="hero">
            <div className="container">
                <div className="hero__content">
                    <h1 className="hero__title">
                        L'Excellence des <span>Plafonds Tendus</span>
                    </h1>
                    <p className="hero__subtitle">
                        Innovation, confort et esthétique premium pour vos espaces
                    </p>
                    <div className="hero__cta">
                        <Link href="/articles" className="btn-gold">
                            Découvrir nos articles
                        </Link>
                        <Link href="/contact" className="btn-outline-gold">
                            Nous contacter
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
