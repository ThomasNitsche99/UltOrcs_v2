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
    select: { username: true, role: true,quote: true, age: true},
  })

  // if `user` exists set `events.local`
  if (user) {
    event.locals.user = {
      username: user.username,
      role: user.role.name,
      age: user.age, 
      quote: user.quote

    }
  }
  // load page as normal
  return await resolve(event)
}
