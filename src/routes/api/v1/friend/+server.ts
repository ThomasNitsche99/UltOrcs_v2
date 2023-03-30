import { prisma } from "$lib/database";
import { error505 } from "$lib/utils/error";
import type { User } from "@prisma/client";
import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

export type DeleteFriendShipParams = {
    userId: string;
    friendId: string;
}

export const DELETE: RequestHandler = async ({ locals, request }) => {
    const userLocals = (locals as { user: User }).user;

    // extract param
    const user = await prisma.user.findFirst({
        where: {
            username: userLocals.username
        }
    })

    if (user === null) {
        return error505("User is not logged in");
    }


    const data = await request.json();

    const { friendId } = data as DeleteFriendShipParams;
    if (friendId === undefined) {
        return json({ message: "Missing param friendId" });
    }

    const userId = user.id;

    const pairs = [{ userId, friendId }, { userId: friendId, friendId: userId }]
    for (const { userId, friendId } of pairs) {
        const friendship = await prisma.friendship.findFirst({
            where: {
                userId,
                friendId
            }
        })

        if (friendship !== null) {
            await prisma.friendship.delete({
                where: {
                    id: friendship.id
                }
            })
        }
    }
    return json({ message: "Deleted friendship" });
}