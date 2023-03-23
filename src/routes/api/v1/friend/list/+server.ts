import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { prisma } from "$lib/database";
import type { User } from "@prisma/client";
import { error505 } from "$lib/utils/error";

// This function returns a list of all friendships for the logged in user
// It uses the $types.ts file to define the type of the RequestHandler
export const GET: RequestHandler = async ({ locals }) => {
    // TODO: When locals have types defined in $types.ts, remove this
    const user = (locals as { user: User }).user;
    if (user === undefined) {
        return error505("User is not logged in");
    }

    return json(await prisma.friendship.findMany({
        where: {
            userId: user.id
        }
    }));
}