<script lang="ts">
	import '../app.postcss';
</script>

<svelte:head>
	<title>Ultorcs</title>
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

<slot />
