import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const apiKey = process.env.RAWG_API_KEY;
    const { searchParams } = new URL(req.url);


    function getLastThreeMonthsRange(): { startDate: string; endDate: string } {
        const now = new Date();
        const endDate = new Date(now);
        const startDate = new Date(now);
        
        startDate.setMonth(startDate.getMonth() - 3);

        const formatDate = (date: Date): string => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        return {
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
        };
    }

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