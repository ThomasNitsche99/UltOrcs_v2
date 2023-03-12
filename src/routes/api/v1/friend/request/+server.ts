import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { prisma } from "$lib/database";
import type { User } from "@prisma/client";
import type { PostFriendRequest } from "$lib/model/friendrequest";

//GET friend requests
export const GET: RequestHandler = async ({ locals }) => {
    // Get current user
    const user = await prisma.user.findFirst({
        where: {
            username: (locals as { user: User }).user.username
        }
    })

    // Collect friend requests
    const friendRequests = [
        ...await prisma.friendRequest.findMany({
            where: {
                fromUser: {
                    username: user?.username
                }
            }
        }),
        ...await prisma.friendRequest.findMany({
            where: {
                toUser: {
                    username: user?.username
                }
            }
        })
    ]

    // Return friend requests
    return json(friendRequests)
}

//POST a friend request
export const POST: RequestHandler = async ({ request }) => {
    // Get current user
    const friendRequest: PostFriendRequest = await request.json()

    if (friendRequest.to === undefined || friendRequest.from === undefined) {
        return new Response(JSON.stringify({ error: "to or from are undefined in request body" }), { status: 500 })
    }

    const fromUser = await prisma.user.findFirst({ where: { username: friendRequest.from } })
    const toUser = await prisma.user.findFirst({ where: { username: friendRequest.to } })

    const possibleOldFriendRequest = await prisma.friendRequest.findFirst({
        where: {
            AND: {
                toUserId: toUser!.id,
                fromUserId: fromUser!.id
            }
        }
    })

    if (possibleOldFriendRequest !== null) {
        return new Response(JSON.stringify({ error: `FriendRequest already exists` }), { status: 500 })
    }


    if (fromUser === null || fromUser.username !== friendRequest.from) {
        return new Response(JSON.stringify({ error: `User ${friendRequest.from} does not exist` }), { status: 500 })
    }

    if (toUser === null || toUser.username !== friendRequest.to) {
        return new Response(JSON.stringify({ error: `User ${friendRequest.to} does not exist` }), { status: 500 })
    }

    await prisma.friendRequest.create({
        data: {
            fromUserId: fromUser.id,
            toUserId: toUser.id
        }
    })

    return json('Add new user request')
}