import { NextResponse } from 'next/server';
import connectDB from "@/lib/mongodb";

export async function GET() {
    try {
        // Vérifie MongoDB
        await connectDB();

        return NextResponse.json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            services: {
                database: 'connected',
                auth: 'ready'
            }
        });
    } catch (error) {
        console.error('Health check failed:', error);

        return NextResponse.json(
            { status: 'error', message: 'Database connection failed' },
            { status: 503 }
        );
    }
}
