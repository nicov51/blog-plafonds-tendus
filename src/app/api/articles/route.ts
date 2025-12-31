import { NextRequest, NextResponse } from 'next/server';
import { Article } from '@/models/Article';
import { uploadImage } from '@/lib/cloudinary';
import dbConnect from '@/lib/mongodb';
import { getErrorMessage } from '@/types';

// GET /api/articles - Liste des articles
export async function GET() {
    try {
        await dbConnect();

        const articles = await Article.find({ published: true })
            .sort({ createdAt: -1 })
            .select('title slug metaDescription image author tags category createdAt likesCount views');

        return NextResponse.json({ success: true, data: articles });
    } catch (error: unknown) {
        return NextResponse.json(
            { success: false, error: getErrorMessage(error) },
            { status: 500 }
        );
    }
}

// POST /api/articles - Créer un article
export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const formData = await request.formData();

        // Récupère les données
        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
        const content = formData.get('content') as string;
        const metaDescription = formData.get('metaDescription') as string;
        const imageFile = formData.get('image') as File;

        // Vérifie les champs obligatoires
        if (!title || !slug || !content || !imageFile) {
            return NextResponse.json(
                { success: false, error: 'Champs manquants' },
                { status: 400 }
            );
        }

        // Upload image
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await uploadImage(buffer) as { secure_url: string; public_id: string };

        // Crée l'article
        const article = await Article.create({
            title,
            slug,
            content,
            metaDescription,
            image: {
                url: uploadResult.secure_url,
                publicId: uploadResult.public_id,
            },
            published: true,
        });

        return NextResponse.json({ success: true, data: article }, { status: 201 });
    } catch (error: unknown) {
        return NextResponse.json(
            { success: false, error: getErrorMessage(error) },
            { status: 500 }
        );
    }
}

