import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

//fetches card deck
export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/')
	}
};
