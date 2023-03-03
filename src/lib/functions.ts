import type { Card } from './model/card';
import type { CardDeck, HorseRace, HorseRaceSettings } from './type/Types';

//function for translating card values into strings
export function cardTranslate(value: string) {
	if (value === 'ACE') {
		return 14;
	} else if (value === 'KING') {
		return 13;
	} else if (value === 'QUEEN') {
		return 12;
	} else if (value === 'JACK') {
		return 11;
	} else {
		return Number(value);
	}
}

//judge that decides when game is finished
export function judge(currentCard: Card, lastCard: Card, guess: string) {
	if (guess === 'none') {
		return false;
	}
	//if guess er under, skal current være mindre enn last
	if (guess === 'under') {
		// true hvis det stemmer
		if (currentCard.face > lastCard.face) {
			return true;
		} else {
			return false;
		}
		//hvis guess er over, skal current være større enn last
	} else if (guess === 'over') {
		if (currentCard.face < lastCard.face) {
			return true;
		} else {
			return false;
		}
	}
}

//gets the next card in the deck
export function nextCard(cardeck: CardDeck, index: number) {
	return cardeck.cards[index];
}

//gets value of last card
export function lastValueInDeck(cardeck: CardDeck, index: number) {
	//if index = 0, return the first card
	if (index === 0) {
		const cardValue = cardeck.cards[index].value;
		return cardTranslate(cardValue);
	}
	//else return the index-1'th card
	else {
		const cardValue = cardeck.cards[index - 1].value;
		return cardTranslate(cardValue);
	}
}

//function for filtering on aces
export function isAce(card: Card) {
	return card.value === 'ACE';
}

//function for fetching a chosen number of random cards
export function randomCards(deck: CardDeck, numberOfCards: number) {
	const cards = [];
	for (let i = 0; i < numberOfCards; i++) {
		cards.push(deck.cards[Math.floor(Math.random() * deck.cards.length)]);
	}
	return cards;
}

export function suitToCode(suit: string) {
	if (suit === 'CLUBS') {
		return 'AC';
	} else if (suit === 'DIAMONDS') {
		return 'AD';
	} else if (suit === 'SPADES') {
		return 'AS';
	} else if (suit === 'HEARTS') {
		return 'AH';
	}
}

//returns the row on the index in the horserace settings
export function getRow(row: number, settings: HorseRaceSettings) {
	if (row === 0) {
		return settings.rows[0];
	} else {
		return settings.rows[row - 1];
	}
}



//moves the specified card up
export function MoveCardUp(suit: string, settings: HorseRaceSettings) {
	//get the code from suit to locate which card to move
	const cardCode = suitToCode(suit);
	//with the code , localize the card and move it one position down

	//find the row where the card is located
	const row = settings.rows.filter(
		(row) => row.cardList.filter((card) => card.code === cardCode).length > 0
	)[0];
	const locationOfCard = row.row;

    console.log(locationOfCard);
	//find index of card
	const index = row.cardList.findIndex((card) => card.code === cardCode);
    console.log(index);
	//find card
	const card = row.cardList[index];
    console.log(card);
    
	//remove card from list
	
    
       
    // if card is on 1, dont move else move one down
    if(locationOfCard != 1){
        //remove card from list
        settings.rows[locationOfCard-1].cardList.splice(index, 1);
        //add to new list
        settings.rows[locationOfCard-2].cardList.push(card);
        
    }

	console.log(settings);
}
