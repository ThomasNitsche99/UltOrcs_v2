<script lang="ts">
	import type { ActionData } from './$types';
	import { Label, Input, Helper, Button, Alert } from 'flowbite-svelte';

	export let form: ActionData;
</script>

<form action="?/register" method="POST" class="w-2/2 md:w-1/2 lg:w-2/6">
	<div class="mb-6 text-center">
		<Label for="large-input" class="block mb-2 text-xl text-white">Brukernavn</Label>
		<Input let:props id="large-input" size="lg" placeholder="Orcenavn">
			<input type="text" {...props} name="username" required />
		</Input>
		<Label for="large-input" class="block mb-2 mt-6 text-xl text-white">Passord</Label>
		<Input let:props id="large-input" size="lg" placeholder="Orceord">
			<input type="password" {...props} name="password" required />
		</Input>
		{#if form?.user}
			<Alert color="red" dismissable class="mt-4">
				<span slot="icon"
					><svg
						aria-hidden="true"
						class="w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
							clip-rule="evenodd"
						/></svg
					>
				</span>
				Noen heter det alt, kluthuet
			</Alert>
		{/if}
		{#if form?.invalid}
		<Alert color="red" dismissable class="mt-4">
			<span slot="icon"
				><svg
					aria-hidden="true"
					class="w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					/></svg
				>
			</span>
			Gi både brukernavn og passord, bro
		</Alert>
		{/if}
		{#if form?.credentials}
		<Alert color="red" dismissable class="mt-4">
			<span slot="icon"
				><svg
					aria-hidden="true"
					class="w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					/></svg
				>
			</span>
			Det der er feil
		</Alert>
		{/if}
	</div>
	<Button type="submit" size="md" color="red">Registrer</Button>
	<div class="mt-4">
		<p class="text-base dark:text-white font-extrabold mb-4 text-white">
			Allerede en orc? Logg Inn
		</p>
		<Button href="/" size="md" color="red">Logg Inn</Button>
	</div>
</form>
