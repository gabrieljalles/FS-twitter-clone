import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest, res: NextApiResponse
) {
    // if method isn´t equal to "GET", senda a message to user
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        //make sure the user is logged and send a message to user
        const { currentUser } = await serverAuth(req);
        return res.status(200).json(currentUser);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}