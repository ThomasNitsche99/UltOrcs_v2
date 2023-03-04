<script lang="ts">
	import { Label, Input, Helper, Button, Heading, P, Blockquote } from 'flowbite-svelte';

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
			<Label for="large-input" class="block mb-2 text-xl text-white">Username</Label>
			<Input let:props id="large-input" size="lg" placeholder="Orcname">
				<input type="text" {...props} name="username" required />
			</Input>
			<Label for="large-input" class="block mb-2 mt-6 text-xl text-white">Password</Label>
			<Input let:props id="large-input" size="lg" placeholder="Orcword">
				<input type="password" {...props} name="password" required />
			</Input>
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
		<Button type="submit" size="md" color="red">Log in</Button>
		<div class="mt-4">
			<p class="text-base dark:text-white font-extrabold mb-4 text-white">Dont have an account? Register a new one</p>
			<Button href="/register" size="md" color="red">Register</Button>
		</div>
	</form>
</div>
