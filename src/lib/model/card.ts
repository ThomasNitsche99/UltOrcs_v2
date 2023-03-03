
export enum Suit {
    Hearts = "H",
    Clubs = "C",
    Diamonds = "D",
    Spades = "S"
}

const suits = [Suit.Hearts, Suit.Diamonds, Suit.Clubs, Suit.Spades]

/**
 * Represents a card
 */
export type Card = {
    face: number,
    suit: Suit
}

/**
 * createCard creates a new card
 * @param face a number that represents 
 * @param suit 
 * @returns 
 */
export const createCard = (face: number, suit: Suit) => {
    // TODO: validate face and suit and throw if they are not right
    return { face, suit }
}

/**
 * Deck class
 * 
 * Handles adding cards, drawing cards and shuffling of the deck.
 */
export class Deck {
    cards: Card[] = []

    addCard = (card: Card) => {
        this.cards.push(card)
    }

    shuffle = () => {
        this.cards = this.cards.sort(() => 0.5 - Math.random())
    }

    drawCard = () => {
        const card = this.cards.pop()
        return card
    }
}

/**
 * createDefaultDeck creates a standard deck consisting of all cards in a typical card deck
 * @returns a deck
 */
export const createDefaultDeck = () => {
    const deck = new Deck()

    suits.forEach(suit => {
        for (let i = 2; i <= 14; i++) {
            deck.addCard(createCard(i, suit))
        }
    })

    return deck
}

/**
 * createDeckFromCards creates a new deck from a list of cards.
 * @param cards the list of cards
 * @returns the deck
 */
export const createDeckFromCards = (cards: Card[]) => {
    const deck = new Deck();
    deck.cards = cards
    return deck
}

export const convertStringToFace = (face: number) => {
    if (face === 11) {
        return "J"
    }
    if (face == 12) {
        return "Q"
    }
    if (face == 13) {
        return "K"
    }
    if (face == 14) {
        return "A"
    }
    return "" + face
}

/**
 * makeCardImageUrl
 * @param card the card
 * @returns the image url for the card
 */
export const makeCardImageUrl = (card: Card) => {
    return `https://deckofcardsapi.com/static/img/${convertStringToFace(card.face)}${card.suit as string}.png`
}
