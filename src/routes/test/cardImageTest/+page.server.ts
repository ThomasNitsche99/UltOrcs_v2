import type { PageServerLoad } from './$types';
import { createDefaultDeck } from '../../../lib/model/card';

//fetches card deck
export const load: PageServerLoad = async ({ fetch }) => {
    const deck = createDefaultDeck();
    deck.shuffle()
    const cards = deck.cards
	return { cards };
};
