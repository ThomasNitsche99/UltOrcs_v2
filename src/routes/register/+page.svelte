<script lang="ts">
	import type { ActionData } from './$types';
	import { Label, Input, Helper, Button } from 'flowbite-svelte';

	export let form: ActionData;
</script>

<h1>Register</h1>

<form action="?/register" method="POST">
	<div class="mb-6">
		<Label for="large-input" class="block mb-2">Username</Label>
		<Input let:props id="large-input" size="lg" placeholder="Orcname">
			<input type="text" {...props} name="username" required />
		</Input>
		<Label for="large-input" class="block mb-2">Passwrod</Label>
		<Input let:props id="large-input" size="lg" placeholder="Orcname">
			<input type="password" {...props} name="password" required />
		</Input>
		{#if form?.user}
			<Helper class="mt-2" color="red"
				><span class="font-medium">Error!</span> Username is used.</Helper
			>
		{/if}
		{#if form?.invalid}
			<Helper class="mt-2" color="red"
				><span class="font-medium">Error!</span> Provide both username and password.</Helper
			>
		{/if}
		{#if form?.credentials}
			<Helper class="mt-2" color="red"
				><span class="font-medium">Error!</span> Wrong credentials provided</Helper
			>
		{/if}
	</div>
	<Button type="submit">Register</Button>
</form>
