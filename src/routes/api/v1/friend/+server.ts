import { error505 } from "$lib/utils/error";
import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

export type DeleteFriendShipParams = {
    userId: string;
    friendId: string;
}

// This function deletes a friend
export const DELETE: RequestHandler = async ({ locals, request }) => {
    // Get current user
    const userLocals = locals.user;
    const user = await prisma.user.findFirst({
        where: {
            username: userLocals.username
        }
    })
    if (user === null) {
        return error505("User is not logged in");
    }

    // Get friendId from request
    const data = await request.json();
    const { friendId } = data as DeleteFriendShipParams;
    if (friendId === undefined) {
        return json({ message: "Missing param friendId" });
    }

    // Delete friendship pairs, one for user and one for the friend since it's a two way relationship
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