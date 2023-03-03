
export enum Suit {
    Hearts = "H",
    Clubs = "C",
    Diamonds = "D",
    Spades = "S"
}

export type Card = {
    face: number,
    suit: Suit
}

export const createCard = (face: number, suit: Suit) => {
    // TODO: validate face and suit and throw if they are not right
    return { face, suit }
}