<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
</script>

<Navigation />
<div class="flex flex-col justify-center items-center grow h-full">
	<div class="container border">
		<slot />
	</div>
</div>
