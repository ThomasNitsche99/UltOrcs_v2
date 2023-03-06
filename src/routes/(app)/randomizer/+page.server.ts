import { redirect, type Action } from '@sveltejs/kit';
import type { PageServerLoad } from '../../$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/');
	}
};


