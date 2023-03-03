import type { PageServerLoad } from './$types';
import { createDefaultDeck, makeCardImageUrl } from '../../../lib/model/card';

//fetches card deck
export const load: PageServerLoad = async ({ fetch }) => {
    const deck = createDefaultDeck();
    deck.shuffle()
    const cards = deck.cards
    const imageUrl = makeCardImageUrl(cards[0])
	return { cards, imageUrl };
};
