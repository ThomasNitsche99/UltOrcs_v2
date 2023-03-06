export class Randomizer {
	players: string[] = [];
	winner: string = '';

	addPlayer = (name: string) => {
		if (!name) {
			throw new Error(name + 'is not valid player');
		}

		this.players.push(name);
	};

	removePlayer = (name: string) => {
		if (!name) {
			throw new Error(name + 'is not valid player');
		} else if (!this.players.includes(name)) {
			throw new Error(name + 'is not added yet');
		} else if (!/^[a-zA-Z]+$/.test(name)) {
			throw new Error(name + 'must only contain letters');
		}

		const index = this.players.findIndex((player) => player === name);
		this.players.splice(index, 1);
	};

	play = () => {
		const random = Math.floor(Math.random() * this.players.length);
		this.winner = this.players[random];
	};

	refresh = () => {
		this.winner=""
		// this.players = [];
	};

	isEmpty = () => {
		return this.players.length === 0;
	};

	getWinner = () => {
		return this.winner;
	}
}
