import { NextResponse } from "next/server";

const apiKey = process.env.RAWG_API_KEY;

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    
    const search = searchParams.get('search') || '';
    const genres = searchParams.get('genres') || '';
    const platforms = searchParams.get('platforms') || '';
    const ordering = searchParams.get('ordering') || '';
    const page = searchParams.get('page') || '1';
    const page_size = searchParams.get('page_size') || '21';

    try {
        const queryParams = new URLSearchParams({
            key: apiKey!,
            page,
            page_size,
        })

        if (search) queryParams.set("search", search);
        if (genres) queryParams.set("genres", genres);
        if (platforms) queryParams.set("platforms", platforms);
        if (ordering) queryParams.set("ordering", ordering);

        const url = `https://api.rawg.io/api/games?${queryParams.toString()}`

        const response = await fetch(url);
        const data = await response.json();

        return NextResponse.json(data.results);
    } catch (err) {
        return NextResponse.json({ error: `Ошибка ${err}` }, { status: 500 });
    }
}