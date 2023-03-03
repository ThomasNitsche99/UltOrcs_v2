<script lang="ts">
	import { getRow, MoveCardUp } from '$lib/functions';
	import { Horserace } from '$lib/games/horserace/horserace';
	import { makeCardImageUrl } from '$lib/model/card';
	import type { HorseRaceSettings } from '$lib/type/Types';
	import { Button, Img } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let rowPlaying = 8;
	let turns = 0;

	//the overall settings
	let horserace: HorseRaceSettings = {
		playableRow: rowPlaying,

		rows: [
			{
				cardList: [data.playingCards[0]],
				fucker: data.playingCards[0],
				row: 1,
				fuckerUsed: false
			},

			{
				cardList: [data.playingCards[1]],
				fucker: data.playingCards[1],
				row: 2,
				fuckerUsed: false
			},
			{
				cardList: [data.playingCards[2]],
				fucker: data.playingCards[2],
				row: 3,
				fuckerUsed: false
			},
			{
				cardList: [data.playingCards[3]],
				fucker: data.playingCards[3],
				row: 4,
				fuckerUsed: false
			},
			{
				cardList: [data.playingCards[4]],
				fucker: data.playingCards[4],
				row: 5,
				fuckerUsed: false
			},
			{
				cardList: [data.playingCards[5]],
				fucker: data.playingCards[5],
				row: 6,
				fuckerUsed: false
			},
			{
				cardList: [data.playingCards[6]],
				fucker: data.playingCards[6],
				row: 7,
				fuckerUsed: false
			},
			{
				cardList: data.Aces,
				fucker: null,
				row: 8,
				fuckerUsed: false
			}
		]
	};

	$: row1 = getRow(1, horserace);
	$: row2 = getRow(2, horserace);
	$: row3 = getRow(3, horserace);
	$: row4 = getRow(4, horserace);
	$: row5 = getRow(5, horserace);
	$: row6 = getRow(6, horserace);
	$: row7 = getRow(7, horserace);
	$: row8 = getRow(8, horserace);

	function updateGame() {
		const suit = 'CLUBS';
		MoveCardUp(suit, horserace);
		turns++;
	}
<<<<<<< HEAD

	$: horseraceBackend = new Horserace(7);
=======
>>>>>>> 3090bdc076425157001357320e53ce286ad32e7b

	// opacity 0 gjør kortene blå --> bruk dette!
</script>

{#key turns}
	<div class="flex justify-center items-center">
		<div class="h-[650px]  w-4/5 p-8">
			{#each horseraceBackend.rows as row}
				<div class="h-[10%] border flex justify-end items-center m-2 ">
					<div class=" w-[5.5%] ">
						<Img
							src={row.showUpSide
								? makeCardImageUrl(row.card)
								: '/images/cards/pokemon_card_backside.png'}
							size="h-full w-full"
						/>
					</div>
				</div>
			{/each}

			<div>
				{#each horseraceBackend.players as player}
					<p>{player.position}</p>
				{/each}
			</div>

			{#if horseraceBackend.topCardInPile() !== undefined}
				<div class="h-[10%] border flex justify-end items-center m-2 ">
					<div class=" w-[5.5%] ">
						<Img src={makeCardImageUrl(horseraceBackend.topCardInPile())} size="h-full w-full" />
					</div>
				</div>
			{/if}

			<div class="h-[10%] border flex justify-center items-center m-2">
				<div class=" w-1/2 h-full flex flex-row justify-evenly items-center ">
					{#each row8.cardList as Card}
						<div class=" h-full w-[11%]">
							<Img src={Card.image} size="h-full w-full" />
						</div>
					{/each}
				</div>
			</div>
			<p>Empty for cards: {horseraceBackend.deck.isEmpty()}</p>
			<Button
				on:click={() => {
					horseraceBackend.update();
					turns++;
				}}
				class="bg-blue-500 hover:bg-blue-600">hallo</Button
			>
		</div>
<<<<<<< HEAD
	</div>
{/key}
=======
	</div> 
{/key}


Horserace
>>>>>>> 3090bdc076425157001357320e53ce286ad32e7b
