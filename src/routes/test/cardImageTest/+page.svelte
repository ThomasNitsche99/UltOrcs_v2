<script lang="ts">
	import { createDeckFromCards, makeCardImageUrl, type Card } from '$lib/model/card';
	import { Button, Img } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$:  deck = createDeckFromCards(data.cards);
	let card: Card | null = null;

	$: cards = data.cards;
</script>

<div>
	<div class="container flex justify-center ">
		<Button
			on:click={() => {
				const newCard = deck.drawCard();
				if (newCard !== undefined) {
					card = newCard;
					
				}
			}}
		>
			Draw card
		</Button>
		{#if card != null}
			<div class="h-[400px]">
				<Img src={makeCardImageUrl(card)} size="sm" class="" />
			</div>
		{/if}
		<div />
		<div class="container flex justify-center">
			<div class="w-1/2">
				{#each deck.cards as card}
					<Img src={makeCardImageUrl(card)} size="sm" class="" />
				{/each}
			</div>
		</div>
	</div>
</div>
