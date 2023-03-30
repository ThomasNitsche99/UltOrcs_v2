<script lang="ts">
	import type { User } from '@prisma/client';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const e: User[] = [];
	$: friends = e;
	$: users = e;

	onMount(() => {
		fetch('/api/v1/friend/list')
			.then((res) => res.json())
			.then((res) => {
				friends = res;
			});
		fetch('/api/v1/user/list')
			.then((res) => res.json())
			.then((res) => {
				users = res;
			});
	});
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
						<div class="border p-2 mt-5">
							<p>User: {friend.username} (age {friend.age})</p>
							<p>Quote: {friend.quote || 'empty'}</p>
							<button
								class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
								on:click={() => {
									const deleteParams = {
										friendId: friend.id
									};

									const req = fetch('/api/v1/friend', {
										method: 'DELETE',
										headers: {
											'Content-Type': 'application/json'
										},
										body: JSON.stringify(deleteParams)
									});

									req
										.then((res) => res.json())
										.then((res) => {
											if (res.success) {
												friends = friends.filter((f) => f.id !== friend.id);
											}
										})
										
								}}
							>
								Remove
							</button>
						</div>
					{/each}
				{/key}
			</div>
		</div>
		<div>
			<div class="border p-2 mt-5">
				<h2 class="text-2xl font-bold dark:text-white">Users list</h2>

				{#key users}
					{#each users as user}
						{#if !friends.find((f) => f.id === user.id)}
							<div class="border p-2 mt-5">
								<p>User: {user.username} (age {user.age})</p>
								<button
									class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
									on:click={() => {}}
								>
									Add
								</button>
							</div>
						{/if}
					{/each}
				{/key}
			</div>
		</div>
	</div>
</div>
