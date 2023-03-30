
import type { User } from '$lib/type/Types'
import type { LayoutServerLoad } from './$types'

// get `locals.user` and pass it to the `page` store
export const load: LayoutServerLoad = async ({ locals, depends }) => {
  // console.log('layout run')
  
  //used for invalidating the user
  depends('app:mother')
  return {
    user: locals.user ,
  }
}
