<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
	import '../app.postcss';
</script>

<div class="flex flex-col h-screen bg-tuborg_green">
	<Navigation />
	<div class="flex flex-col justify-center items-center grow h-full">
		<div class="container border">
			<slot />
		</div>
	</div>
</div>
