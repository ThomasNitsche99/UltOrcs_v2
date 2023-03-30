import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { prisma } from "$lib/database";

// This function returns a list of all friendships for the logged in user
// It uses the $types.ts file to define the type of the RequestHandler
export const GET: RequestHandler = async ({ locals }) => {
    const users = await prisma.user.findMany();
    return json(users);
}