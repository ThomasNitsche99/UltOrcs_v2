<script lang="ts">
	import { createDefaultDeck, makeCardImageUrl, type Card } from '$lib/model/card';
	import type { FriendRequest, User } from '@prisma/client';
	import { Button, Img } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const e: User[] = [];
	$: friends = e;
</script>

<div class="flex justify-center">
	<div class="w-1/2">
		<h1 class="text-4xl font-extrabold dark:text-white">Friendship test</h1>
		<div>
			{#if data.user}
				<div class="border p-2 mt-5">
					<h2 class="text-2xl font-bold dark:text-white">Current user</h2>
					<p>Username: {data.user.username}</p>
					<p>Age: {data.user.age}</p>
					<p>Quote: {data.user.quote}</p>
				</div>
			{/if}
		</div>
		<div>
			<div class="border p-2 mt-5">
				<h2 class="text-2xl font-bold dark:text-white">Friend list</h2>

				{#key friends}
					{#each friends as friend}
						<p>{friend.username}</p>
					{/each}
				{/key}
			</div>
		</div>
	</div>
</div>
