<script lang="ts">
	import { Horserace } from '$lib/games/horserace/horserace';
	import { createCard, makeCardImageUrl, Suit } from '$lib/model/card';
	import { Img } from 'flowbite-svelte';

	let turns = 0;

	const horseraceBackend = new Horserace(7);

	const aces = [
		createCard(14, Suit.Clubs),
		createCard(14, Suit.Hearts),
		createCard(14, Suit.Diamonds),
		createCard(14, Suit.Spades)
	];

	const aceImages: string[] = [];
	aces.forEach((ace, i) => {
		aceImages[i] = makeCardImageUrl(ace);
	});

	const rows = [-1, 0, 1, 2, 3, 4, 5, 6, 7];
	rows.reverse();

	const diagnostics = horseraceBackend.diagnostics;
</script>

{#key turns}
	{#if diagnostics.length > 0}
		<div
			class="absolute left-20 max-h-48 overflow-scroll text-yellow-300 p-3 bg-slate-800"
			lang="ts"
		>
			<h2 class="text-white">History</h2>
			{#each diagnostics.map((e) => e).reverse() as report}
				<p class={`text-xs w-120  text-${report.seen ? 'white' : 'yellow-300'}`}>
					{`[${report.timestamp}] ${report.message}`}
				</p>
			{/each}
		</div>
	{/if}
	<div class="flex justify-center items-center">
		<div class="h-[650px]  w-4/5 p-8">

			{#each rows as row}
				<div class="h-[10%] flex justify-between items-center m-2 ">
					<div />
					<div class="flex flex-row w-[310px] h-full justify-between ">
						{#each [0, 1, 2, 3] as i}
							<div
								class={'w-[40px] h-full opacity-' +
									(horseraceBackend.players[i].position === row ? 1 : 0)}
							>
								<Img src={aceImages[i]} size="h-full w-full" />
							</div>
						{/each}
					</div>
					<div class=" w-[5.5%] ">
						{#if row >= 0 && row <= 6}
							<Img
								src={horseraceBackend.rows[row].showUpSide
									? makeCardImageUrl(horseraceBackend.rows[row].card)
									: '/images/cards/pokemon_card_backside.png'}
								size={`h-full w-full rotate-${horseraceBackend.rows[row].rotated ? 90 : 0}`}
							/>
						{/if}
					</div>
				</div>
			{/each}

			<div class="h-[10%] flex justify-end items-center m-2 ">
				<div class=" w-[5.5%] ">
					<p>Pile</p>
					<Img
						src={horseraceBackend.topCardInPile() === undefined
							? '/images/cards/no_card.png'
							: makeCardImageUrl(horseraceBackend.topCardInPile())}
						size="h-full w-full rotate-90"
					/>
				</div>
				<div class=" w-[5.5%] ml-5">
					<p>Deck</p>
					<div
						on:click={() => {
							horseraceBackend.update();
							turns++;
						}}
						on:keydown
					>
						<Img
							src={horseraceBackend.deck.isEmpty()
								? '/images/cards/no_card.png'
								: '/images/cards/pokemon_card_backside.png'}
							size="h-full w-full"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
{/key}
