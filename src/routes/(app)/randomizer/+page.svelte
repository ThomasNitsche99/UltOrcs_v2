<script lang="ts">
	import { Randomizer } from '$lib/games/randomizer/randomizer';
	import {
		Label,
		ButtonGroup,
		InputAddon,
		Input,
		Button,
		Badge,
		Helper,
		Heading,
		Spinner
	} from 'flowbite-svelte';
	import { form, field } from 'svelte-forms';
	import { required, between, pattern } from 'svelte-forms/validators';
	import { XMark } from 'svelte-heros-v2';

	//getting new game
	let randomizer = new Randomizer();
	//refreshing game
	randomizer.refresh();

	//added names
	let added = randomizer.players.length;
	//state for showing loading state
	let choosing = false;
	let played = false;

	//field
	const name = field('name', '', [required(), between(1, 20), pattern(/^[a-zA-Z]+$/)], {
		validateOnChange: false
	});
	//form
	const myForm = form(name);

	function delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	//validates form, if all good => play!
	function add() {
		myForm.validate().then(() => {
			//hvis formen er valid, legg til navn
			if ($myForm.valid) {
				randomizer.addPlayer($name.value);
				added++;
				myForm.reset();
			}

			if (randomizer.isEmpty()) {
				console.log('tom liste');
			}
		});
	}

	function play() {
		myForm.reset();
		if (!randomizer.isEmpty()) {
			//Chooses a winner
			randomizer.play();
			added--;
			choosing = true;
			played = true;
			delay(2000).then(() => {
				choosing = false;
				added = randomizer.players.length;
			});
		}
	}

	function reset() {
		randomizer.refresh();
		console.log(randomizer.getWinner());
		played = false;
		added = randomizer.players.length;
	}

	function remove(name: string) {
		randomizer.removePlayer(name);
		added--;
	}
</script>

<!-- bruk badges flowbite -->

<!-- {#key randomizer.players} -->
<!-- mother div -->
<div class=" w-full flex items-center justify-center border">
	<!-- cover -->
	<div class=" w-full md:w-3/4 flex flex-col justify-center items-center border">
		<!-- input field -->
		<div class="w-[90%] mx-10 h-[125px] border md:w-1/2 ">
			{#if played === false}
				<div class="pt-8">
					<Label for="input-addon" class="mb-2 text-center text-xl text-white"
						>Skriv inn navnet på boian</Label
					>
					<ButtonGroup class="w-full">
						<InputAddon>&</InputAddon>
						<Input id="input-addon" type="text" placeholder="orcname" bind:value={$name.value} />

						<Button color="red" on:click={() => add()}>Legg til</Button>
					</ButtonGroup>
					{#if $myForm.hasError('name.required')}
						<Helper class="mt-2 text-lg" helperClass="text-2xl text-red-600"
							><span class="font-medium" /> Ta å fyll inn et navn da!</Helper
						>
					{:else if $myForm.hasError('name.between')}
						<Helper class="mt-2 text-lg" helperClass="text-2xl text-red-600"
							><span class="font-medium" /> Hold deg til 0 - 20 bokstaver bro!</Helper
						>
					{:else if $myForm.hasError('name.pattern')}
						<Helper class="mt-2 text-lg" helperClass="text-2xl text-red-600"
							><span class="font-medium" />Bare bokstaver broder, bare bokstaver...!</Helper
						>
					{/if}
				</div>
			{:else}
				<div class="pt-8 text-center">
					<h1  class="text-white text-4xl md:text-5xl">VELGER DEN HELDIGE:</h1>
				</div>
			{/if}
		</div>
		<!-- plotted names -->
		{#key added}
			{#if choosing === true && played === true}
				<div class="flex justify-center items-center text-center h-[400px] w-11/12 my-4 md:w-3/4 ">
					<Heading tag="h1" class="text-white"><Spinner size={'20'} /></Heading>
				</div>
			{:else if choosing === false && played === true}
				<div class="flex justify-center items-center text-center h-[400px] w-11/12 my-4 md:w-3/4">
					<Heading tag="h2" class="text-white">{randomizer.getWinner()}</Heading>
				</div>
			{:else if randomizer.isEmpty()}
				<div class="flex justify-center items-center text-center h-[400px] w-11/12 my-4 md:w-3/4 ">
					<Heading tag="h1" class="text-white">Plott inn navn for å begynne!</Heading>
				</div>
			{:else}
				<div class="bg-white h-[400px] w-11/12 my-8 md:w-3/4 ">
					<!-- navn kart -->
					<div class="flex  p-1 justify-start items-start flex-wrap">
						{#each randomizer.players as player}
							<Badge dismissable large color="red" class="text-lg mx-4 my-4 text-right md:text-xl">
								{player}
								<svelte:fragment slot="closeBtn">
									<button
										on:click={() => {
											remove(player);
										}}
										type="button"
										class="inline-flex items-center p-0.5 ml-2 text-sm bg-transparent rounded-sm text-blue-400 hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
										aria-label="Remove"
									>
										<svg
											aria-hidden="true"
											class="w-5 h-5"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
											><path
												fill-rule="evenodd"
												d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
												clip-rule="evenodd"
											/></svg
										>
										<span class="sr-only">Remove badge</span>
									</button>
								</svelte:fragment>
							</Badge>
						{/each}
					</div>
				</div>
			{/if}
		{/key}
		<!-- button div -->
		{#if added != 0 && choosing === false && played != true}
			<div>
				<Button gradient color="pinkToOrange" size="xl" on:click={() => play()}
					>Kjør randomizer</Button
				>
			</div>
		{/if}
		{#if choosing === false && played === true}
			<div>
				<Button gradient color="pinkToOrange" size="xl" on:click={() => reset()}>Spell igjen</Button
				>
			</div>
		{/if}
		<div />
	</div>
</div>
