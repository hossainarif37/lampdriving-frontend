import { NextApiRequest, NextApiResponse } from 'next';
import suburbs from "@/constant/sydneySuburbs.json"

interface Suburb {
    label: string;
    [key: string]: any;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { limit, search } = req.query;
    let data = suburbs;

    if (search) {
        data = suburbs.filter((suburb: Suburb) =>
            suburb.label.toLowerCase().includes((search as string).toLowerCase())
        );
    } else {
        data = suburbs.slice(0, Number(limit) || 12);
    }
    res.status(200).json(data);
}
