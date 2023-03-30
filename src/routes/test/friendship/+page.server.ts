import { prisma } from "$lib/database";
import type { User } from "$lib/type/Types";
import type { Friendship } from "@prisma/client";
import { redirect } from "@sveltejs/kit"
import { onMount } from "svelte";
import type { PageServerLoad } from "../../$types"

export const load: PageServerLoad = async ({ locals }) => {
    // redirect user if logged in

    const user = (locals as { user: User }).user;

    if (!user) {
        throw redirect(302, '/')
    }        

    return {
        user
    }
}