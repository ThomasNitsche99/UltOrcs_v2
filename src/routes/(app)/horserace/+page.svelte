<script lang="ts">
	import { getRow, MoveCardUp } from '$lib/functions';
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

	// opacity 0 gjør kortene blå --> bruk dette!
</script>

{#key turns}
	<div class="flex justify-center items-center">
		<div class="h-[650px]  w-4/5 p-8">
			<div class="h-[10%] border flex justify-end items-center m-2 ">
				<div class=" w-[5.5%] ">
					{#each row1.cardList as Card}
						<Img src={Card.image} size="h-full w-full" />
					{/each}
				</div>
			</div>

			<div class="h-[10%] border flex justify-end items-center m-2 mr-4">
				<div class=" w-[5.5%]">
					{#each row2.cardList as Card}
						<Img src={Card.image} size="h-full w-full" class="rotate-90" />
					{/each}
				</div>
			</div>

			<div class="h-[10%] border flex justify-end items-center m-2">
				<div class=" w-[5.5%]">
					{#each row3.cardList as Card}
						<Img src={Card.image} size="h-full w-full" />
					{/each}
				</div>
			</div>

			<div class="h-[10%] border flex justify-end items-center m-2">
				<div class=" w-[5.5%]">
					{#each row4.cardList as Card}
						<Img src={Card.image} size="h-full w-full" />
					{/each}
				</div>
			</div>
			<div class="h-[10%] border flex justify-end items-center m-2 mr-4">
				<div class=" w-[5.5%]">
					{#each row5.cardList as Card}
						<Img src={Card.image} size="h-full w-full" class="rotate-90" />
					{/each}
				</div>
			</div>
			<div class="h-[10%] border flex justify-end items-center m-2">
				<div class=" w-[5.5%]">
					{#each row6.cardList as Card}
						<Img src={Card.image} size="h-full w-full" />
					{/each}
				</div>
			</div>
			<div class="h-[10%] border flex justify-end items-center m-2 bg-blue-50">
				<div class=" w-3/4 h-full bg-red-600 flex flex-row justify-end items-center">
					{#each row7.cardList as Card}
						<div class=" w-[7%] bg-black ">
							<Img src={Card.image} size="h-full w-full" />
						</div>
					{/each}
				</div>
			</div>
			<div class="h-[10%] border flex justify-center items-center m-2">
				<div class=" w-1/2 h-full flex flex-row justify-evenly items-center ">
					{#each row8.cardList as Card}
						<div class=" h-full w-[11%]">
							<Img src={Card.image} size="h-full w-full" />
						</div>
					{/each}
				</div>
			</div>
			<Button on:click={() => updateGame()} class="bg-blue-500 hover:bg-blue-600">hallo</Button>
		</div>
	</div> 
{/key}


Horserace
