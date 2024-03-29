import type { FriendRequest, Friendship } from "@prisma/client";
import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "../../$types"

export const load: PageServerLoad = async ({ locals }) => {
    // redirect user if logged in
    const userLocals = locals.user;
    if (!userLocals) {
        throw redirect(302, '/')
    }

    // Gets user from database
    const user = await prisma.user.findUnique({
        where: {
            username: userLocals.username
        },
    })
    if (!user) {
        throw redirect(302, '/')
    }

    // Gets all friend requests and associated users
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

    // Make a superstruct of all friend requests
    const friendRequests = {
        sent,
        sentUsers,
        received,
        receivedUsers,
    }

    // Gets all friends and associated users
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

    // Gets all users that are not friends or the user
    const allUsers = (await prisma.user.findMany()).filter(u => u.id !== user.id && !friends.find(f => f.friendId === u.id))

    return {
        user,
        friendRequests,
        friends,
        friendsUsers,
        allUsers
    }
}