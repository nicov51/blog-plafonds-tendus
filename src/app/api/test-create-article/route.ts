import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import {Article} from '@/models/Article';

export async function POST() {
    try {
        await connectDB();

        const testArticle = {
            title: 'Les avantages du plafond tendu pour votre intérieur',
            slug: 'avantages-plafond-tendu',
            content: `
        <h2>Pourquoi choisir un plafond tendu ?</h2>
        <p>Le plafond tendu est une solution moderne et élégante qui transforme complètement vos espaces. Voici les principaux avantages :</p>
        
        <h3>1. Installation rapide</h3>
        <p>Contrairement aux faux plafonds traditionnels, le plafond tendu se pose en quelques heures seulement, sans poussière ni gros travaux.</p>
        
        <h3>2. Design personnalisable</h3>
        <p>Choisissez parmi une large gamme de couleurs, textures (mat, satiné, laqué) et même des impressions numériques pour un rendu unique.</p>
        
        <h3>3. Entretien minimal</h3>
        <p>Un simple coup de chiffon humide suffit ! Le plafond tendu est antistatique et résiste aux taches.</p>
        
        <h3>4. Isolation acoustique</h3>
        <p>Améliore le confort sonore de vos pièces, idéal pour les bureaux ou salles de réunion.</p>
        
        <blockquote>
          "Nous avons installé un plafond tendu dans notre cuisine et le résultat est bluffant ! Lumière parfaite et entretien facile." - Client satisfait
        </blockquote>
        
        <p><strong>Envie d'en savoir plus ?</strong> Contactez-nous pour un devis gratuit et personnalisé.</p>
      `,
            metaDescription: 'Découvrez les avantages du plafond tendu : installation rapide, design personnalisable, entretien facile. Guide complet 2024.',
            category: 'conseils',
            image: {
                url: 'https://res.cloudinary.com/de1cxg0nb/image/upload/v1312461204/sample.jpg', // Image temporaire
                publicId: 'test-plafond-tendu',
                alt: 'Plafond tendu moderne dans un salon'
            },
            author: {
                name: 'Équipe Plafond Tendu Pro',
                email: 'contact@plafondtendu.fr'
            },
            tags: ['conseils', 'installation', 'design', 'isolation'],
            published: true
        };

        const article = await Article.create(testArticle);

        return NextResponse.json({
            success: true,
            message: 'Article de test créé !',
            data: article
        }, { status: 201 });

    } catch (error: unknown) {
        console.error('Erreur création article test:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Erreur inconnue'
        }, { status: 500 });
    }
}
