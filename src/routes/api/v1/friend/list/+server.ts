import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { prisma } from "$lib/server/database";
import type { User } from "@prisma/client";

//Fetch the friend list of the user
export const GET: RequestHandler = async ({ locals }) => {
    // TODO: Check if logged in

    const user = await prisma.user.findFirst({  
        where: {
            username: (locals as { user: any}).user.username
        }
    })

    if (user === null) {
        return new Response(JSON.stringify({ error: "User does not exist" }), { status: 500 })
    }

    // TODO: Get firends list
    return json(await prisma.friendship.findMany());
}