import type { CardDeck, NewCardDeck } from '$lib/type/Types';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

//fetches card deck
export const load: PageServerLoad = async ({ fetch }) => {
	const NewCardDeckRequest = await fetch(
		'https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
	);
	const NewCardDeckResponse = (await NewCardDeckRequest.json()) as unknown as NewCardDeck;
	// fetches all 52 cards
	const CardDeck = await fetch(
		`https://www.deckofcardsapi.com/api/deck/${NewCardDeckResponse.deck_id}/draw/?count=52`
	);
	const Cards = (await CardDeck.json()) as unknown as CardDeck;

	if (!Cards) {
		throw error(404, 'Fetch failed');
	}

	console.log('fetching cards')

	return { Cards };
};
