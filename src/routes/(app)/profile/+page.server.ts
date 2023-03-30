import { redirect, type Action, fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../../$types';


export const load: PageServerLoad = async ({ locals, cookies, parent }) => {
	// redirect user if logged in
	if (!locals.user) {
		throw redirect(302, '/');
	}
};
