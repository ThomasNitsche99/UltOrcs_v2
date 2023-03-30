import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { prisma } from "$lib/server/database";
import { error505 } from "$lib/utils/error";

// This function returns a list of all friendships for the logged in user
// It uses the $types.ts file to define the type of the RequestHandler
export const GET: RequestHandler = async ({ locals }) => {
    const userLocals = locals.user;
    if (userLocals === undefined) {
        return error505("User is not logged in");
    }


    const user = await prisma.user.findFirst({
        where: {
            username: userLocals.username
        }
    })

    if (user === null) {
        return error505("user does not exist")
    }

    const friendships = await prisma.friendship.findMany({
        where: {
            userId: user.id
        }
    });

    const friendsUsers = await prisma.user.findMany({
        where: {
            id: {
                in: friendships.map(friendship => friendship.friendId)
            }
        }
    });

    return json(friendsUsers);
}