import { prisma } from "$lib/database";
import type { User } from "$lib/type/Types";
import type { FriendRequest, Friendship } from "@prisma/client";
import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "../../$types"

export const load: PageServerLoad = async ({ locals }) => {
    // redirect user if logged in

    const userLocals = (locals as { user: User }).user;

    if (!userLocals) {
        throw redirect(302, '/')
    }

    const user = await prisma.user.findUnique({
        where: {
            username: userLocals.username
        },
    })

    if (!user) {
        throw redirect(302, '/')
    }

    const sent = await prisma.friendRequest.findMany({
        where: {
            fromUserId: user.id,
        }
    })
    const sentUsers = await prisma.user.findMany({
        where: {
            id: {
                in: sent.map((friendRequest: FriendRequest) => friendRequest.toUserId)
            }
        }
    })

    const received = await prisma.friendRequest.findMany({
        where: {
            toUserId: user.id,
        }
    })
    const receivedUsers = await prisma.user.findMany({
        where: {
            id: {
                in: received.map((friendRequest: FriendRequest) => friendRequest.fromUserId)
            }
        }
    })

    const friendRequests = {
        sent,
        sentUsers,
        received,
        receivedUsers,
    }

    const friends = await prisma.friendship.findMany({
        where: {
            userId: user.id,
        }
    })
    const friendsUsers = await prisma.user.findMany({
        where: {
            id: {
                in: friends.map((friendship: Friendship) => friendship.friendId)
            }
        }
    })

    const allUsers = await prisma.user.findMany()

    return {
        user,
        friendRequests,
        friends,
        friendsUsers,
        allUsers
    }
}