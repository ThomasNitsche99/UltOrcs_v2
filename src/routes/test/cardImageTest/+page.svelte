<script lang="ts">
	import { Img } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	//$: cards = data.cards;
	$: imageUrl = data.imageUrl;
</script>

<div>
	<div class="container flex justify-center ">
		<div class="container flex justify-center">
			<div class="w-1/2">
				<Img src={imageUrl} size="sm" class="" />
			</div>
		</div>
	</div>
</div>
