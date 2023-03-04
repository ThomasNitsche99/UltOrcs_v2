<script lang="ts">
	import { createDefaultDeck, makeCardImageUrl, type Card } from '$lib/model/card';
	import { Button, Img } from 'flowbite-svelte';

	let deck = createDefaultDeck();
	let card: Card | null = null;
	$: counter = 0;
</script>

{#key counter}
	<div>
		<div class="container flex justify-center ">
			<Button
				on:click={() => {
					const newCard = deck.drawCard();
					if (newCard !== undefined) {
						card = newCard;
					}
					counter++
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
					{#each [...Array(deck.cards.length).keys()].reverse() as i}
						<Img src={makeCardImageUrl(deck.cards[i])} size="sm" class="" />
					{/each}
				</div>
			</div>
		</div>
	</div>
{/key}
