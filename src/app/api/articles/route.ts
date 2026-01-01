import { NextRequest, NextResponse } from 'next/server';
import { Article } from '@/models/Article';
import dbConnect from '@/lib/mongodb';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();

        const article = await Article.create({
            ...body,
            published: true,
            createdAt: new Date(),
        });

        return NextResponse.json({ success: true, data: article });
    } catch (error) {
        console.error('Erreur:', error);
        return NextResponse.json(
            { success: false, error: String(error) },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await dbConnect();
        const articles = await Article.find({ published: true }).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: articles });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}



