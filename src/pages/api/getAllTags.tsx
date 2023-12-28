import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    if(req.method === 'POST') {
        try {
            const tags = await prisma.tag.findMany();
            res.status(200).json(tags);
        }catch(err) {
            res.status(500).json({error: 'Error retrieving tags'});
        }
    } else {
        res.status(405).json({error: 'Method not allowed'});
    }
}   