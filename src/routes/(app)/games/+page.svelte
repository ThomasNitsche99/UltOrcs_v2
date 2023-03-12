<script lang="ts">
	import { Button, Card, Img } from 'flowbite-svelte';
	import { Heading, Blockquote } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData; 
</script>

<!-- Mother div -->
<div class="w-full flex justify-center">
	<div class="flex flex-col justify-between w-full">
		<Heading tag="h2" class="text-center mt-6 mb-4  text-white ">TILGJENGELIGE SPILL</Heading>

		<!-- grid div -->
		<div class="grid grid-cols-1 md:grid-cols-3 justify-items-center h-ful">
			<Card size="xs" reverse={false} class="w-full my-4 md:w-4/5 transition ease-in-out delay-15 hover:scale-105">
				<Heading tag="h2" customSize="text-2xl font-extrabold text-center">Randomizer</Heading>
				<Img src="/images/beer.png" alt="sample 1" />
				<Blockquote size="sm" >
					Plott inn navn på gutta og se tapern drekke
				</Blockquote>
				<Button class="my-7" size="xl" color="blue" href="randomizer">Spill</Button>
			</Card>
			<Card size="xs" reverse={false} class="w-full my-4 md:w-4/5 transition ease-in-out delay-15 hover:scale-105">
				<Heading tag="h2" customSize="text-3xl font-extrabold text-center">Over/under</Heading>
				<Img src="/images/card2.jpg" alt="sample 1" />
				<Blockquote size="sm" >
					Over eller under. Tapern drikker slurkene
				</Blockquote>
				<Button class="my-7" size="xl" color="blue" href="overUnder">Spill</Button>
			</Card>
			<Card size="xs" reverse={false} class="w-full my-4 md:w-4/5 transition ease-in-out delay-15 hover:scale-105">
				<Heading tag="h2" customSize="text-3xl font-extrabold text-center">Hesteløp</Heading>
				<Img src="/images/card2.jpg" alt="sample 1" class="w-full h-full"/>
				<Blockquote size="sm" >
					Sats slurker på hesten, få på låta og føl på spenningen
				</Blockquote>
				<Button class="my-7" size="xl" color="blue" href="/horserace">Spill</Button>
			</Card>
		</div>
	</div>
</div>
