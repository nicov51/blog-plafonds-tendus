import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';

export async function GET() {
    try {
        await connectDB();

        const count = await Article.countDocuments();

        const dbName = process.env.MONGODB_URI?.split('/')[3]?.split('?')[0] || 'unknown';

        return NextResponse.json({
            success: true,
            message: 'MongoDB connecté !',
            articlesCount: count,
            database: dbName
        });
    } catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : 'Erreur inconnue';

        console.error('Erreur MongoDB:', errorMessage);

        return NextResponse.json({
            success: false,
            error: errorMessage
        }, { status: 500 });
    }
}

