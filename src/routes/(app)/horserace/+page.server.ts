import type { CardDeck, NewCardDeck } from '$lib/type/Types';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

//fetches card deck
export const load: PageServerLoad = async ({ locals }) => {

	if (!locals.user) {
		throw redirect(302, '/')
	}

};
