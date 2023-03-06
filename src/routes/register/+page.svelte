<script lang="ts">
	import type { ActionData } from './$types';
	import { Label, Input, Helper, Button } from 'flowbite-svelte';

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
			<Helper class="mt-2" color="red"
				><span class="font-medium">Error!</span> Noen heter det alt, kluthuet</Helper
			>
		{/if}
		{#if form?.invalid}
			<Helper class="mt-2" color="red"
				><span class="font-medium">Error!</span> Gi både brukernavn og passord bro.</Helper
			>
		{/if}
		{#if form?.credentials}
			<Helper class="mt-2" color="red"
				><span class="font-medium">Error!</span> Det der er feil</Helper
			>
		{/if}
	</div>
	<Button type="submit" size="md" color="red">Registrer</Button>
	<div class="mt-4">
		<p class="text-base dark:text-white font-extrabold mb-4 text-white">Allerede en orc? Logg Inn</p>
		<Button href="/" size="md" color="red">Logg Inn</Button>
	</div>
</form>
