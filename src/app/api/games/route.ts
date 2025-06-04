import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const apiKey = process.env.RAWG_API_KEY;
    const { searchParams } = new URL(req.url);
    
    const search = searchParams.get('search') || '';
    const page = searchParams.get('page') || '1';
    const page_size = searchParams.get('page_size') || '21';

    try {
        const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${search}&page=${page}&page_size=${page_size}`);
        const data = await response.json();
        return NextResponse.json(data.results);
    } catch (err) {
        return NextResponse.json({ error: `Ошибка ${err}` }, { status: 500 });
    }
}