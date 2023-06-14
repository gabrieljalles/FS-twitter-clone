import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth";
import prisma from '@/libs/prismadb';

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);

    //check if user isn´t logged, send error message
    if (!session?.user?.email) {
        throw new Error('Not signed in');
    }

    //get the current user with email checking database
    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    });

    //if current user does not exist send error message
    if (!currentUser) {
        throw new Error('Not signed in');
    }

    return { currentUser };
}

export default serverAuth;

