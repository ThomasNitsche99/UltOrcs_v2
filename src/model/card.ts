
export enum Suit {
    Hearts = "H",
    Clubs = "C",
    Diamonds = "D",
    Spades = "S"
}

const suits = [Suit.Hearts, Suit.Diamonds, Suit.Clubs, Suit.Spades]

export type Card = {
    face: number,
    suit: Suit
}

export const createCard = (face: number, suit: Suit) => {
    // TODO: validate face and suit and throw if they are not right
    return { face, suit }
}

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

export const createDefaultDeck = () => {
    const deck = new Deck()

    suits.forEach(suit => {
        for (let i = 2; i <= 14; i++) {
            deck.addCard(createCard(i, suit))
        }
    })

    return deck
}

export const createDeckFromCards = (cards: Card[]) => {
    const deck = new Deck();
    deck.cards = cards
    return deck
}

export const getCardImage = async (card: Card) => {
    const url = `https://deckofcardsapi.com/static/img/${card.face}${card.suit as string}.png`
    const response = await fetch(url)
    return await response.json()
}