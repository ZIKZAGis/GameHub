import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const apiKey = process.env.RAWG_API_KEY;
    const {search = '', page = 1, page_size = 21} = req.query

    try {
        const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${search}&page=${page}&page_size=${page_size}`)
        const data = await response.json()
        res.status(200).json(data.results)
    } catch (err) {
        res.status(500).json({error: `Ошибка ${err}`})
    }
}