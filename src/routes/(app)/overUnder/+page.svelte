<script lang="ts">
	import { Img, Hr, Heading } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { Button, Modal } from 'flowbite-svelte';
	import { judge } from '$lib/functions';
	import { ArrowDownCircle } from 'svelte-heros-v2';
	import { createDefaultDeck, makeCardImageUrl, type Card } from '$lib/model/card';

	export let data: PageData;

	let defaultModal = false;
	var index = 0;

	//getting carddeck
	const deck = createDefaultDeck();
	deck.shuffle();

	//initial Cards
	let playingCard = deck.drawCard();
	let lastcard: Card | null = null;

	//sets the next Card
	function setNextCard() {
		//increase index
		index++;
		//update values
		lastcard = playingCard;
		//get next card
		playingCard = deck.drawCard();
	}
	
	$: buttonValue = 'none';
	$: gameFinished = false;

	//reactive check for gamestatus using reactive variables
	$: if (
		playingCard !== null &&
		lastcard !== null &&
		judge(playingCard, lastcard, buttonValue) === true
	) {
		defaultModal = true;
		gameFinished = true;
	}

	//updates the playingcard, sets buttonvalue
	function update(guess: string) {
		setNextCard();
		buttonValue = guess;
	}
</script>

<div class="flex flex-col justify-center items-center w-full">
	<!-- heading -->
	<div class="my-0 text-2xl text-center mb-2 mt-4">
		<Heading tag="h1" class="text-blue-50 drop-shadow-2xl">Over eller under</Heading>
	</div>
	<Hr class="mx-auto md:my-2" width="w-48" height="h-1" />
	<!-- grid div -->
	<div class="text-center text-3xl mb-9">
		<Heading tag="h4">
			{#if index > 5 && index <= 9}
				<span class="text-base text-orange-600">Nærmer seg ult: </span>
			{:else if index > 9 && index <= 12}
				<span class="text-base text-purple-600-600">ULT: </span>
			{:else if index > 12}
				<span class="text-base text-red-600">I helvette da: </span>
			{:else}
				<span class="text-base text-gray-800">Rookies: </span>
			{/if}
			<span class="text-3xl text-white drop-shadow-lg">{index}</span>
			slurker</Heading
		>
	</div>
	<!-- image -->
	<div class="flex justify-center w-1/2 h-full">
		{#if playingCard !== null}
			<Img src={makeCardImageUrl(playingCard)} />
		{/if}
	</div>

	<!-- buttons -->
	<div class="flex flex-row justify-evenly items-center my-5 w-1/3">
		{#if gameFinished}
			<Button
				href="/overUnder"
				target="_self"
				color="red"
				size="lg"
				class="border border-2 border-black"
			>
				Replay</Button
			>
		{:else}
			<Button
				color="red"
				on:click={() => update('over')}
				size="lg"
				class="border border-2 border-black">Over</Button
			>
			<Button
				color="red"
				on:click={() => update('under')}
				size="lg"
				class="border border-2 border-black">Under</Button
			>
		{/if}
	</div>

	<Modal title="Du TAPTE!" bind:open={defaultModal} permanent={false}>
		<div class="flex flex-col">
			<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
				Der tapte du gitt! Enten så heter du Iven eller så sutter du på å gjette
			</p>
			<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
				{#if index > 10}
					ULT madrogada!!!
				{/if}
				Ta å drekk {index} slurker!
			</p>
		</div>

		<svelte:fragment slot="footer">
			<Button href="/overUnder" target="_self">Kjør igjen<ArrowDownCircle /></Button>
			<Button color="alternative" href="https://www.drammen.kommune.no/">Ivans hjem</Button>
		</svelte:fragment>
	</Modal>
</div>
