import { json } from "@sveltejs/kit";
import type { RequestHandler } from "../$types";
import type { PutFriendRequestAccept } from "$lib/model/friendrequest";
import { prisma } from "$lib/server/database";
import { error505 } from "$lib/utils/error";

// PUT accept a friend request
export const PUT: RequestHandler = async ({ request, locals }) => {
    // Get current user
    const userLocals = locals.user;
    const user = await prisma.user.findFirst({
        where: {
            username: userLocals.username
        }
    })
    if (user === null) {
        return error505("User does not exist")
    }

    // Get friendRequestId from request
    const friendRequestAccept: PutFriendRequestAccept = await request.json();
    if (friendRequestAccept.friendRequestId === undefined) {
        return error505("friendRequestId not defined in body")
    }

    // Check if friend request exists
    const friendRequest = await prisma.friendRequest.findFirst({ where: { id: friendRequestAccept.friendRequestId } })
    if (friendRequest === null || friendRequest.id !== friendRequestAccept.friendRequestId) {
        return error505(`FriendRequest does not exist`)
    }

    // Create synchronous friendship
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

    // Delete friend request
    await prisma.friendRequest.delete({
        where: {
            id: friendRequestAccept.friendRequestId
        }
    })

    return json("Friend request accepted");
}

// DELETE decline a friend request
export const DELETE: RequestHandler = async ({ request }) => {
    // Get friendRequestId from request
    const friendRequestAccept: PutFriendRequestAccept = await request.json();
    if (friendRequestAccept.friendRequestId === undefined) {
        new Response(JSON.stringify({ error: "friendRequestId not defined in body" }), { status: 500 })
    }

    // Check if friend request exists
    const friendRequest = await prisma.friendRequest.findFirst({ where: { id: friendRequestAccept.friendRequestId } })
    if (friendRequest === null || friendRequest.id !== friendRequestAccept.friendRequestId) {
        return new Response(JSON.stringify({ error: `FriendRequest does not exist` }), { status: 500 })
    }

    // Delete friend request
    await prisma.friendRequest.delete({
        where: {
            id: friendRequestAccept.friendRequestId
        }
    })

    return json("Friend request declined");
}