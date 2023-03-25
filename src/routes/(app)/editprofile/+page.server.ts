import { validateAge, validateQuote } from '$lib/utils/validation';
import { fail, redirect } from '@sveltejs/kit';
import type { Action } from './$types';
import type { PageServerLoad } from '../../$types';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	// redirect user if logged in
	if (!locals.user) {
		throw redirect(302, '/');
	}
};

const editProfile: Action = async ({ request, locals }) => {
	const data = await request.formData();
	const age = data.get('age');
	const quote = data.get('quote');

	//hjelpe funksjoner for å sjekke dette ?
	let age_num: number | undefined = undefined;
	let quote_checked: string | undefined = undefined;

	//if age, check age
	if (age) {
		const check = validateAge(age.toString());
		if (check != null) {
			console.log('age fail');
			return fail(400, { age, invalid: true, message: check.message });
		}
		age_num = parseInt(age.toString());
	}

	//if quote, check quote
	if (quote) {
		const check = validateQuote(quote.toString());
		if (check.error) {
			console.log('qutoe fail');
			return fail(400, { quote, invalid: true, message: check.message });
		}
		quote_checked = quote.toString();
	}

	//if all is good, update user

	await prisma.user.update({
		where: { username: locals.user.username },
		data: {
			quote: quote_checked || undefined,
			age: age_num || undefined
		}
	});

	// console.log('user updated');
	throw redirect (302, '/profile');
	// return {success: true}

};

export const actions: Actions = { editProfile };
