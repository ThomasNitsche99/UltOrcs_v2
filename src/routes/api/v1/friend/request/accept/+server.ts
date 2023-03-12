import { json } from "@sveltejs/kit";
import type { RequestHandler } from "../$types";
import type { PutFriendRequestAccept } from "$lib/model/friendrequest";
import { prisma } from "$lib/database";

export const PUT: RequestHandler = async ({ request }) => {
    const friendRequestAccept: PutFriendRequestAccept = await request.json();

    if (friendRequestAccept.friendRequestId === undefined) {
        new Response(JSON.stringify({ error: "friendRequestId not defined in body" }), { status: 500 })
    }

    const friendRequest = await prisma.friendRequest.findFirst({ where: { id: friendRequestAccept.friendRequestId } })
    if (friendRequest === null || friendRequest.id !== friendRequestAccept.friendRequestId) {
        return new Response(JSON.stringify({ error: `FriendRequest does not exist` }), { status: 500 })
    }

    // TODO: Add users to each others friend list

    const response = await prisma.friendRequest.delete({
        where: {
            id: friendRequestAccept.friendRequestId
        }
    })

    return json({ ...response, "_TODO": "DIT NOT ADD FRIEND TO FRIEND LIST. NOT IMPLEMENTED!" });
}