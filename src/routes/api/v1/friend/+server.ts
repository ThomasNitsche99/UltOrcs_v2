import { prisma } from "$lib/database";
import { error505 } from "$lib/utils/error";
import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

export type DeleteFriendShipParams = {
    userId: string;
    friendId: string;
}

export const DELETE: RequestHandler = async ({ locals, request }) => {
    // extract param
    const user = await prisma.user.findFirst({
        where: {
            username: locals.user.username
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

    const friendship = await prisma.friendship.findFirst({
        where: {
            userId,
            friendId
        }
    })

    if (friendship === null) {
        return json({ message: "Friendship not found" });
    }

    await prisma.friendship.delete({
        where: {
            id: friendship.id
        }
    })

    return json({ message: "Deleted friendship" });
}