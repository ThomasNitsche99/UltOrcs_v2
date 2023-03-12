import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "../../$types"

export const load: PageServerLoad = async ({ locals }) => {
    // redirect user if logged in
   
    if (!locals.user) {
      throw redirect(302, '/')
    }
  }