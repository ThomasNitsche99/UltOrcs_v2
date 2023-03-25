<script lang="ts">
	import type { PageData, ActionData } from './$types';

	import { Button, Img, Modal, Label, Alert, Input } from 'flowbite-svelte';
	let formModal = false;

	export let data: PageData;
	export let form: ActionData;
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
					<Button color="red" pill on:click={() => (formModal = true)}>Edit</Button>
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

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
	<form class="flex flex-col space-y-6" action="?/editProfile" method="POST">
		<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Rediger profil</h3>
		
		<!-- {#if form?.user}
			<Alert color="red" dismissable class="mt-4">
				<span slot="icon"
					><svg
						aria-hidden="true"
						class="w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
							clip-rule="evenodd"
						/></svg
					>
				</span>
				Noen heter det alt, kluthuet
			</Alert>
		{/if} -->
		<Label class="space-y-2">
			<span>Alder</span>
			<Input type="number" name="age" placeholder="69" required />
		</Label>
		<Label class="space-y-2">
			<span>Quote</span>
			<Input type="text" name="quote" placeholder="jeg setter meg ned for blindern OHG" required />
		</Label>

		<Button type="submit" class="w-full1">Oppdater</Button>
	</form>
</Modal>
