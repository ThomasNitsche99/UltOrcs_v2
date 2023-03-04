import { Suit, createDeckWithoutAce, type Card, cardToString } from "$lib/model/card"
import { currentTimeString } from "$lib/utils/time"

class Player {
    position = -1
    suit: Suit

    constructor(suit: Suit) {
        this.suit = suit
    }
}

type Row = {
    showUpSide: boolean
    rotated: boolean
    card: Card
}

export type Diagnostic = {
    timestamp: string,
    funcName: string,
    message: string,
    seen: boolean
}

export class Horserace {
    deck = createDeckWithoutAce()
    pile: Card[] = []
    players = [new Player(Suit.Clubs), new Player(Suit.Hearts), new Player(Suit.Diamonds), new Player(Suit.Spades)]
    rows: Row[] = []
    numberOfRows = 7
    diagnostics: Diagnostic[] = []
    debug = true

    constructor(numerOfRows: number) {
        this.deck.shuffle()
        this.deck.shuffle()
        this.numberOfRows = numerOfRows
        for (let i = 0; i < this.numberOfRows; i++) {
            this.rows.push({
                showUpSide: false,
                rotated: (i + 1) % 2 == 0, // Every two cards are rotated
                card: this.deck.drawCard()!
            })
        }
    }

    setDiagnosticsSeen = () => {
        this.diagnostics.forEach(diag => diag.seen = true)
    }

    drawCardToPile = () => {
        // Draw card and put on top of pile
        const card = this.deck.drawCard()
        if (card == null) {
            console.log('TODO: deck is empty')
            this.report("drawCardToPile", "Deck is empty!")
            return
        }
        this.pile.push(card)
        this.report("drawCardToPile", `Drawn a ${cardToString(card)}`)
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
                this.report("updateShowingCards", `Opened card on row ${i} and got card ${cardToString(this.rows[i].card)}`)

                // Make player go down
                const openedCard = this.rows[i].card
                this.players.forEach(player => {
                    const reachedTop = player.position >= 7
                    if (!reachedTop && openedCard.suit === player.suit) {
                        if (this.rows[player.position].rotated) {
                            player.position -= 2
                            this.report("updateShowingCards", `Player ${player.suit} goes down 2 steps`)
                        } else {
                            player.position--
                            this.report("updateShowingCards", `Player ${player.suit} goes down 1 steps`)
                        }
                    }
                })
            }
        }
    }

    clampPlayerPosition = () => {
        this.players.forEach(player => {
            if (player.position < -1) {
                player.position = -1
            }
            if (player.position > 7) {
                player.position = 7;
            }
        })
    }

    update = () => {
        this.setDiagnosticsSeen()
        this.drawCardToPile()
        this.updatePlayerPosition()
        this.updateShowingCards()
        this.clampPlayerPosition()
    }

    topCardInPile = () => {
        return this.pile.findLast(card => card)
    }

    report = (func: string, message: string) => {
        if (this.debug) {
            this.diagnostics.push(
                {
                    funcName: func,
                    message: message,
                    timestamp: currentTimeString(),
                    seen: false
                }
            )
        }
    }
}