import { createDefaultDeck } from "../../../../../lib/model/card";
import type { RequestHandler } from "../../../newCardDeck/$types";
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch }) => {
    const deck = createDefaultDeck()
    deck.shuffle()
    return json(deck)
}