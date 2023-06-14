import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import prisma from '@/libs/prismadb';

const serverAuth = async (req: NextApiRequest) => {
    const session = await getSession({ req });

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

