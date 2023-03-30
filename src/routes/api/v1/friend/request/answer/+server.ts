import { json } from "@sveltejs/kit";
import type { RequestHandler } from "../$types";
import type { PutFriendRequestAccept } from "$lib/model/friendrequest";
import { prisma } from "$lib/server/database";

//PUT accept a friend request
export const PUT: RequestHandler = async ({ request, locals }) => {
    const userLocals = locals.user;
    const user = await prisma.user.findFirst({
        where: {
            username: userLocals.username
        }
    })
    if (user === null) {
        return new Response(JSON.stringify({ error: "User does not exist" }), { status: 500 })
    }

    const friendRequestAccept: PutFriendRequestAccept = await request.json();

    if (friendRequestAccept.friendRequestId === undefined) {
        new Response(JSON.stringify({ error: "friendRequestId not defined in body" }), { status: 500 })
    }

    const friendRequest = await prisma.friendRequest.findFirst({ where: { id: friendRequestAccept.friendRequestId } })
    if (friendRequest === null || friendRequest.id !== friendRequestAccept.friendRequestId) {
        return new Response(JSON.stringify({ error: `FriendRequest does not exist` }), { status: 500 })
    }

    await prisma.friendship.create({
        data: {
            userId: user.id,
            friendId: friendRequest.fromUserId
        }
    })
    await prisma.friendship.create({
        data: {
            userId: friendRequest.fromUserId,
            friendId: user.id
        }
    })


    const response = await prisma.friendRequest.delete({
        where: {
            id: friendRequestAccept.friendRequestId
        }
    })

    return json({ ...response, "_TODO": "DIT NOT ADD FRIEND TO FRIEND LIST. NOT IMPLEMENTED!" });
}

export const DELETE: RequestHandler = async ({ request }) => {
    const friendRequestAccept: PutFriendRequestAccept = await request.json();

    if (friendRequestAccept.friendRequestId === undefined) {
        new Response(JSON.stringify({ error: "friendRequestId not defined in body" }), { status: 500 })
    }

    const friendRequest = await prisma.friendRequest.findFirst({ where: { id: friendRequestAccept.friendRequestId } })
    if (friendRequest === null || friendRequest.id !== friendRequestAccept.friendRequestId) {
        return new Response(JSON.stringify({ error: `FriendRequest does not exist` }), { status: 500 })
    }

    const response = await prisma.friendRequest.delete({
        where: {
            id: friendRequestAccept.friendRequestId
        }
    })


    return json({ ...response, "head": "Friend request declined" });

}