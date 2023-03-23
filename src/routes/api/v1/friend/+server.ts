import { prisma } from "$lib/database";
import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

type DeleteFriendShipParams = {
    userId: string;
    friendId: string;
}

export const DELETE: RequestHandler = async ({ locals, request }) => {
    // extract param
    const data = await request.json();
    const { userId, friendId } = data as DeleteFriendShipParams;
    if (userId === undefined || friendId === undefined) {
        return json({ message: "Missing params: userId and friendId" });
    }

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