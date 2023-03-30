<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { user, friends, friendsUsers, friendRequests, allUsers } = data;

	// Join friendRequest.sent with friendRequest.sentUsers
	const sentFriendRequests = friendRequests.sent.map((req) => {
		const user = friendRequests.sentUsers.find((user) => user.id === req.toUserId);

		return {
			...req,
			receiver: user
		};
	});
	const receivedFriendRequests = friendRequests.received.map((req) => {
		const user = friendRequests.receivedUsers.find((user) => user.id === req.fromUserId);

		return {
			...req,
			sender: user
		};
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

				{#key friendsUsers}
					{#each friendsUsers as friend}
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

									req.then((res) => res.json()).then((res) => {});
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
				{#key allUsers}
					{#each allUsers as user}
						{#if !friends.find((f) => f.id === user.id) && !friendRequests.sent.find((req) => req.toUserId === user.id) && !friendRequests.received.find((req) => req.fromUserId === user.id)}
							<div class="border p-2 mt-5">
								<p>User: {user.username} (age {user.age})</p>
								<button
									class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
									on:click={() => {
										const params = {
											to: user.id,
											from: data.user.id
										};

										const req = fetch('/api/v1/friend/request', {
											method: 'POST',
											headers: {
												'Content-Type': 'application/json'
											},
											body: JSON.stringify(params)
										});

										req.then((res) => res.json()).then((res) => {});
									}}
								>
									Send friend request
								</button>
							</div>
						{/if}
					{/each}
				{/key}
			</div>
		</div>

		<div>
			<div class="border p-2 mt-5">
				<h2 class="text-2xl font-bold dark:text-white">Friend requests sent</h2>
				{#key sentFriendRequests}
					{#each sentFriendRequests as request}
						<div class="border p-2 mt-5">
							<p>To: {request.receiver?.username} (age {request.receiver?.age})</p>
							<button
								class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
								on:click={() => {
									const deleteParams = {
										friendRequestId: request.id
									};

									const req = fetch('/api/v1/friend/request', {
										method: 'DELETE',
										headers: {
											'Content-Type': 'application/json'
										},
										body: JSON.stringify(deleteParams)
									});

									req.then((res) => res.json()).then((res) => {});
									req.catch((err) => {
										console.log(err);
									});
								}}
							>
								Cancel request
							</button>
						</div>
					{/each}
				{/key}
			</div>
		</div>
	</div>
</div>
