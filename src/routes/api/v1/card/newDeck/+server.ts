import { createDefaultDeck } from "../../../../../lib/model/card";
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    const deck = createDefaultDeck()
    deck.shuffle()
    return json(deck)
}