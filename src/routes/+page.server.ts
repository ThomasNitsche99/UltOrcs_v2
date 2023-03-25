import bcrypt from 'bcrypt'
import { prisma } from '$lib/server/database'
import { fail,redirect,  type Action, type Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
  // redirect user if logged in
  if (locals.user) {
    throw redirect(302, '/games')
  }
}
const login: Action = async ({ cookies, request }) => {
  const data = await request.formData()
  console.log(data.entries().next().value)
  data.forEach((value, key) => console.log(value, key))
  const username = data.get('username')
  const password = data.get('password')

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    !username ||
    !password
  ) {
    return fail(400, { invalid: true })
  }

  const user = await prisma.user.findUnique({ where: { username } })

  if (!user) {
    return fail(400, { credentials: true })
  }

  const userPassword = await bcrypt.compare(password, user.passwordHash)

  if (!userPassword) {
    return fail(400, { credentials: true })
  }

  // generate new auth token just in case
  const authenticatedUser = await prisma.user.update({
    where: { username: user.username },
    data: { userAuthToken: crypto.randomUUID() },
  })

  //sets cookie for the authenticated user
  cookies.set('session', authenticatedUser.userAuthToken, {
    // send cookie for every page
    path: '/',
    // server side only cookie so you can't use `document.cookie`
    httpOnly: true,
    // only requests from same site can send cookies
    // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
    sameSite: 'strict',
    // only sent over HTTPS in production
    secure: process.env.NODE_ENV === 'production',
    // set cookie to expire after a month
    maxAge: 60 * 60 * 24 ,
  })

  // redirect the user
  throw redirect(302, '/games')
}

export const actions: Actions = { login }
