<script>
	import { Button, Card, Img} from 'flowbite-svelte';
	import { Heading, P, A } from 'flowbite-svelte';
</script>

<!-- Mother div -->
<div class="flex flex-col justify-between">
	<Heading tag="h1" class="text-center mb-8 text-blue-50">Velkommen til Ultorcs</Heading>

	<!-- grid div -->
	<div class="grid grid-cols-3 justify-items-center h-full">
		<Card size="xs" reverse={false} >
			<Heading tag="h2" customSize="text-3xl font-extrabold text-center">Randomizer</Heading>

			<Img src="/images/beer.png" alt="sample 1" />
			<Button class="my-7" size="xl" color="blue" href="randomizer">Spill</Button>
		</Card>
		<Card size="xs" reverse={false}>
			<Heading tag="h2" customSize="text-3xl font-extrabold text-center">Over eller under</Heading>

			<Img src="/images/card2.jpg" alt="sample 1" />
			<Button class="my-7" size="xl" color="blue" href="overUnder">Spill</Button>
		</Card>
		<Card size="xs" reverse={false} >
			<Heading tag="h2" customSize="text-3xl font-extrabold text-center">Hesteløp</Heading>

			<Img src="/images/card2.jpg" alt="sample 1" class="w-full h-full" />
			<Button class="my-7" size="xl" color="blue" href="/horserace">Spill</Button>
		</Card>
	</div>
</div>
