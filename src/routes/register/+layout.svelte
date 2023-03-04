<script lang="ts">
	import { Heading, P, Blockquote } from 'flowbite-svelte';
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
	<slot />
</div>
