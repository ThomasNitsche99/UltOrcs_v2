import { Deck, Suit, createDeckWithoutAce, type Card } from "$lib/model/card"

class Player {
    position = -1
    suit: Suit

    constructor(suit: Suit) {
        this.suit = suit
    }
}

type Row = {
    showUpSide: boolean
    card: Card
}

export class Horserace {
    deck = createDeckWithoutAce()
    pile: Card[] = []
    players = [new Player(Suit.Clubs), new Player(Suit.Hearts), new Player(Suit.Diamonds), new Player(Suit.Spades)]
    rows: Row[] = []
    numberOfRows = 7

    constructor(numerOfRows: number) {
        this.deck.shuffle()
        this.numberOfRows = numerOfRows
        for (let i = 0; i < this.numberOfRows; i++) {
            this.rows.push({
                showUpSide: false,
                card: this.deck.drawCard()!
            })
        }
    }

    drawCardToPile = () => {
        // Draw card and put on top of pile
        const card = this.deck.drawCard()
        if (card == null) {
            console.log('TODO: deck is empty')
            return
        }
        this.pile.push(card)
    }

    updatePlayerPosition = () => {
        this.players.forEach(player => {
            if (player.suit === this.topCardInPile()?.suit) {
                if (player.position < 7) {
                    player.position = player.position + 1
                }
            }
        });
    }

    updateShowingCards = () => {
        for (let i = 0; i < this.numberOfRows; i++) {
            let playersBelow = false;

            // Check if all players have acheived this level
            this.players.forEach(player => {
                playersBelow = playersBelow || player.position < i
            })

            // Stop if there are players below this row
            if (playersBelow) {
                break
            }

            if (this.rows[i].showUpSide === false) {
                this.rows[i].showUpSide = true;
            }
        }
    }

    update = () => {
        this.rows.reverse()
        this.drawCardToPile()
        this.updatePlayerPosition()
        this.updateShowingCards()
        this.rows.reverse()
    }

    topCardInPile = () => {
        return this.pile.findLast(card => card)
    }
}