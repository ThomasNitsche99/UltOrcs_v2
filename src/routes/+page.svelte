<script lang="ts">
	import { Label, Input, Helper, Button, Heading, Alert, Blockquote } from 'flowbite-svelte';

	import type { ActionData } from './login/$types';
	export let form: ActionData;
</script>

<div class="flex flex-col h-screen  items-center bg-[url('/images/heaven.jpg')] bg-bottom bg-cover">
	<div class=" my-[80px] text-center">
		<Heading tag="h1" class="mb-2" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
			>Welcome to ultorcs</Heading
		>
		<Blockquote class="text-center text-base md:text-xl lg:text-2xl">
			The place to drink and play games
		</Blockquote>
	</div>
	<form action="?/login" method="POST" class="w-/2 md:w-1/2 lg:w-2/6">
		<div class="mb-6 text-center">
			<Label for="large-input" class="block mb-2 text-xl text-white">Brukernavn</Label>
			<Input let:props id="large-input" size="lg" placeholder="Orcnavn">
				<input type="text" {...props} name="username" required />
			</Input>
			<Label for="large-input" class="block mb-2 mt-6 text-xl text-white">Passord</Label>
			<Input let:props id="large-input" size="lg" placeholder="Orcord">
				<input type="password" {...props} name="password" required />
			</Input>
			{#if form?.invalid}
				
				<Alert color="red" dismissable class="mt-4">
					<span slot="icon"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
					</span>
					Gi både brukernavn og passord, dustehuet
				  </Alert>
			{/if}
			{#if form?.credentials}
				
				<Alert color="red" dismissable class="mt-4">
					<span slot="icon"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
					</span>
					Feil credentials gitt, kluthuet
				  </Alert>
			{/if}
		</div>
		<Button type="submit" size="md" color="red">Logg Inn</Button>
		<div class="mt-4">
			<p class="text-base dark:text-white font-extrabold mb-4 text-white">
				Har du ikke bruker? Registrer en ny orc
			</p>
			<Button href="/register" size="md" color="red">Registrer</Button>
		</div>
	</form>
</div>
