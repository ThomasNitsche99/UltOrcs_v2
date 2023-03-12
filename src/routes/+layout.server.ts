
import type { User } from '$lib/type/Types'
import type { LayoutServerLoad } from './$types'

// get `locals.user` and pass it to the `page` store
export const load: LayoutServerLoad = async ({ locals }) => {
  return {
    user: locals.user as User,
  }
}
