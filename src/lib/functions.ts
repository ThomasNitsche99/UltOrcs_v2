import type { Card } from './model/card';


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



