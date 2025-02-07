import suburbs from "@/constant/sydneySuburbs.json";
import { NextResponse } from 'next/server';

interface Suburb {
    label: string;
    [key: string]: any;
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const limit = searchParams.get('limit');
        const search = searchParams.get('search');

        let data = suburbs;

        if (search) {
            data = suburbs.filter((suburb: Suburb) =>
                suburb.label.toLowerCase().includes(search.toLowerCase())
            );
        } else if (limit) {
            data = suburbs.slice(0, Number(limit));
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in API route:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}