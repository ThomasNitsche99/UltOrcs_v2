<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
</script>

<Navigation />
<div class="flex flex-col items-center">
	<div class="">
		<slot />
	</div>
</div>
