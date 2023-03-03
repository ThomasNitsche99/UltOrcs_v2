import type { Handle } from '@sveltejs/kit'
import { prisma } from '$lib/database'

export const handle: Handle = async ({ event, resolve }) => {
  // get cookies from browser
  const session = event.cookies.get('session')

  if (!session) {
    // if there is no session load page as normal
    return await resolve(event)
  }

  // find the user based on the session
  const user = await prisma.user.findUnique({
    where: { userAuthToken: session },
    select: { username: true, role: true },
  })

  // if `user` exists set `events.local`
  if (user) {
    event.locals.user = {
      name: user.username,
      role: user.role.name,
    }
  }
  // load page as normal
  return await resolve(event)
}
