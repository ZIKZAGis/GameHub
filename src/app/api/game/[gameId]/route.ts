import { NextResponse } from "next/server";

const apiKey = process.env.RAWG_API_KEY;

export async function GET(
    request: Request, 
    {params}: {params: {gameId: string}}
) {
    await new Promise(resolve => setTimeout(resolve, 0));
    
    const {gameId} = await params

    if (!apiKey) {
        return NextResponse.json(
            { error: "API key is not configured" },
            { status: 500 }
        );
    }

    try {
        const response = await fetch(
            `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`,
            {next: {revalidate: 3600}}
        );

        if (!response.ok) {
            throw new Error(`RAWG API error: ${response.statusText}`)
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error"
        console.error("Error fetching game:", errorMessage)

        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}