import { NextResponse } from "next/server";
import { getLastThreeMonthsRange } from "./helpers/getLastThreeMonthsRange";

const apiKey = process.env.RAWG_API_KEY;

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const { startDate, endDate } = getLastThreeMonthsRange();
    const dates = `${startDate},${endDate}`
    const page_size = searchParams.get('page_size') || '8';

    try {
        const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&dates=${dates}&ordering=-reviews_count&page_size=${page_size}`);
        const data = await response.json();
        return NextResponse.json(data.results);
    } catch (err) {
        return NextResponse.json({ error: `Ошибка ${err}` }, { status: 500 });
    }
}