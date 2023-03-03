import type { CardDeck, NewCardDeck } from '$lib/type/Types';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { randomCards } from '$lib/functions';

//fetches card deck
export const load: PageServerLoad = async ({ fetch, }) => {
	//retrieve new deck
	const NewCardDeckRequest = await fetch(
		'https://www.deckofcardsapi.com/api/deck/new/draw/?count=52'
	);
    
	const Cards = (await NewCardDeckRequest.json()) as unknown as CardDeck;

	//funksjon for å hente ut alle aces
	const Aces = Cards.cards.filter((card) => card.value === 'ACE');
	const playingCards = randomCards(Cards, 8);

    

	return { Aces, playingCards };
};
