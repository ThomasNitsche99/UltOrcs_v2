<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { Button, Img, Modal, Label, Alert, Input } from 'flowbite-svelte';
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data: PageData;

	onMount(async () => {
		invalidate('app:mother');
	});


</script>

<!-- mother div -->
<div class="w-full h-full p-6">
	<!-- center div -->
	<div class="flex justify-center items center">
		<!-- content div -->
		<div class=" h-[600px] w-6/12 flex flex-row p-4 bg-white rounded-2xl">
			<!-- first -->
			<div class=" bg-purple-500 w-1/2 rounded-2xl my-4">
				<!-- profile pic -->
				<div class=" border-black h-2/3">
					<Img src="/images/profile.png" alt="sample 1" class="" />
				</div>
				<!-- info box -->
				<div class="text-left">
					<!-- name -->
					<p class="text-2xl text-white">
						Navn: {data.user.username}
					</p>

					<!-- rolle -->
					<p class="text-2xl text-white">
						Nivå: {data.user.role}
					</p>
					<p class="text-2xl text-white">
						Alder: {data.user.age}
					</p>
					<p class="text-2xl text-white">
						Quote: {data.user.quote}
					</p>
				</div>
				<!-- button -->
				<div class="flex justify-center">
					<Button color="red" pill on:click={() => goto('/editprofile')}>Edit</Button>
				</div>
			</div>
			<!-- second -->
			<div class=" w-1/2 flex flex-col justify-between p-4">
				<!-- stats div -->
				<div class="bg-purple-600 h-1/2 rounded-2xl mb-4 ">
					<div class="text-center">stats</div>
				</div>

				<div class="bg-pink-600  h-1/2 rounded-2xl ">
					<div class="text-center">achievements</div>
				</div>
			</div>
		</div>
	</div>
</div>
