<script lang="ts">
	import { page } from '$app/stores';
	import '../app.postcss';
</script>

<svelte:head>
	<title>SvelteKit Auth</title>
</svelte:head>

<!-- <nav>
	{#if !$page.data.user}
		<a href="/login">Login</a>
		<a href="/register">Register</a>
	{/if}

	{#if $page.data.user}
		<a href="/admin">Admin</a>

		<form action="/logout" method="POST">
			<button type="submit">Log out</button>
		</form>
	{/if}
</nav> -->

<div class="flex flex-col h-screen bg-tuborg_green">
	<slot />
</div>
