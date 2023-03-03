<script lang="ts">
	import { getRow, MoveCardUp } from '$lib/functions';
	import { Horserace } from '$lib/games/horserace/horserace';
	import { createCard, makeCardImageUrl, Suit } from '$lib/model/card';
	import type { HorseRaceSettings } from '$lib/type/Types';
	import { Button, Img } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let turns = 0;

	$: horseraceBackend = new Horserace(7);

	const aces = [
		createCard(14, Suit.Clubs),
		createCard(14, Suit.Hearts),
		createCard(14, Suit.Diamonds),
		createCard(14, Suit.Spades)
	];

	const rows = [-1, 0, 1, 2, 3, 4, 5, 6, 7];
	rows.reverse();
</script>

{#key turns}
	<div class="flex justify-center items-center">
		<div class="h-[650px]  w-4/5 p-8">

			{#if horseraceBackend.topCardInPile() !== undefined}
				<div class="h-[10%] flex justify-end items-center m-2 ">
					<div class=" w-[5.5%] ">
						<Img src={makeCardImageUrl(horseraceBackend.topCardInPile())} size="h-full w-full" />
					</div>
				</div>
			{/if}

			{#each rows as row}
				<div class="h-[10%] flex justify-between items-center m-2 ">
					<div />
					<div class="flex flex-row w-[310px] h-full justify-between ">
						
							{#each [0, 1, 2, 3] as i}
							<div class={'w-[40px] h-full opacity-'+ (  horseraceBackend.players[i].position === row ? 1 : 0)}>
								<Img src={makeCardImageUrl(aces[i])} size="h-full w-full" />
							</div>
							{/each}

					</div>
					<div class=" w-[5.5%] ">
						{#if row >= 0 && row <= 6}
						<Img
						src={horseraceBackend.rows[row].showUpSide
							? makeCardImageUrl(horseraceBackend.rows[row].card)
							: '/images/cards/pokemon_card_backside.png'}
						size="h-full w-full"
					/> 
						{/if}
						
					</div>
				</div>
			{/each}
			<Button
				on:click={() => {
					horseraceBackend.update();
					turns++;
				}}
				class="bg-blue-500 hover:bg-blue-600">hallo</Button
			>
		</div>
	</div>
{/key}
