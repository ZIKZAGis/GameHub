import { NextResponse } from "next/server";
import { getMonthsRange } from "@/lib/getMonthsRange";

const apiKey = process.env.RAWG_API_KEY;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const period = searchParams.get("period"); // 'past' или 'future'
  const page_size = searchParams.get("page_size") || "12";

  if (period !== "past" && period !== "future") {
    return NextResponse.json({ error: "Invalid period" }, { status: 400 });
  }

  const { startDate, endDate } = getMonthsRange(period, 1);
  const dates = `${startDate},${endDate}`;

  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${apiKey}&dates=${dates}&ordering=-released-rating&page_size=${page_size}`
    );
    const data = await response.json();
    return NextResponse.json(data.results);
  } catch (err) {
    return NextResponse.json({ error: `Ошибка ${err}` }, { status: 500 });
  }
}
