import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const apiKey = process.env.RAWG_API_KEY;
    const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}`)
    const data = await response.json();
    res.status(200).json(data)
}