//api/newsletter GET

import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
	const options: ResponseInit = {
		status: 418,
		headers: {
			X: 'gon give it to ya'
		}
	};
	return new Response('hello', options);
};

// //api/newsletter POST
export const POST: RequestHandler = async (event) => {
	const data = await event.request.formData();
	const email = data.get('email');

	//subscribe the user to the newsletter
	console.log(email);

	return new Response(JSON.stringify({ success: true }), {
		headers: {
			'content-type': 'application/json'
		}
	});
};
