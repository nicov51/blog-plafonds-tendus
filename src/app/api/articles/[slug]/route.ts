import { NextRequest, NextResponse } from 'next/server';
import { Article } from '@/models/Article';
import dbConnect from '@/lib/mongodb';
import { getErrorMessage } from '@/types';

// GET /api/articles/mon-slug - Récupérer UN article
export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        await dbConnect();

        const article = await Article.findOne({ slug: params.slug });

        if (!article) {
            return NextResponse.json(
                { success: false, error: 'Article non trouvé' },
                { status: 404 }
            );
        }

        // Incrémente les vues
        article.views += 1;
        await article.save();

        return NextResponse.json({ success: true, data: article });
    } catch (error: unknown) {
        return NextResponse.json(
            { success: false, error: getErrorMessage(error) },
            { status: 500 }
        );
    }
}
