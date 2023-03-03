
export enum Suit {
    Hearts = "hearts",
    Clubs = "clubs",
    Diamonds = "diamonds",
    Spades = "spades"
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
        if (card === undefined) {
            return null
        }
        return card
    }

    isEmpty = () => {
        return this.cards.length === 0
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

export const createDeckWithoutAce = () => {
    const deck = new Deck()

    suits.forEach(suit => {
        for (let i = 2; i <= 13; i++) {
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
        return "jack"
    }
    if (face == 12) {
        return "queen"
    }
    if (face == 13) {
        return "king"
    }
    if (face == 14) {
        return "ace"
    }
    return "" + face
}

export const cardToImageName = (card: Card) => {
    return `${convertStringToFace(card.face)}_of_${card.suit as string}`
}

/**
 * makeCardImageUrl
 * @param card the card
 * @returns the image url for the card
 */
export const makeCardImageUrl = (card: Card) => {
    return `/images/cards/${cardToImageName(card)}.png`
}
