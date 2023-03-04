<script lang="ts">
	import type { ActionData } from './$types';
	import { Label, Input, Helper, Button } from 'flowbite-svelte';

	export let form: ActionData;
</script>

<form action="?/register" method="POST" class="w-2/2 md:w-1/2 lg:w-2/6">
	<div class="mb-6 text-center">
		<Label for="large-input" class="block mb-2 text-xl">Username</Label>
		<Input let:props id="large-input" size="lg" placeholder="Orcname">
			<input type="text" {...props} name="username" required />
		</Input>
		<Label for="large-input" class="block mb-2 mt-6 text-xl">Password</Label>
		<Input let:props id="large-input" size="lg" placeholder="Orcword">
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
	<Button type="submit" size="md" color="red">Register</Button>
	<div class="mt-4">
		<p class="text-base dark:text-white font-extrabold mb-4">Have an account? Log In</p>
		<Button href="/" size="md" color="red">Log In</Button>
	</div>
</form>
