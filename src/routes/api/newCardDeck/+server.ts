import type { CardDeck, NewCardDeck } from '$lib/type/Types';
import type { RequestHandler } from '../newsletter/$types';

import { error, json } from '@sveltejs/kit';

//fetches card deck
export const GET: RequestHandler = async ({fetch}) => {
    const NewCardDeckRequest = await fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    const NewCardDeckResponse = await NewCardDeckRequest.json() as unknown as NewCardDeck
    // fetches all 52 cards
    const CardDeck = await fetch(`https://www.deckofcardsapi.com/api/deck/${NewCardDeckResponse.deck_id}/draw/?count=52`);
    const Cards = await CardDeck.json() as unknown as CardDeck;

    error(400, 'Invalid')
    return json(Cards)
};
