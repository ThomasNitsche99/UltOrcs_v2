<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { Button, Label, Input } from 'flowbite-svelte';
	import type { PageData, ActionData } from './$types';
    import { browser } from '$app/environment';

	export let form: ActionData;
	export let data: PageData;

	if (form?.success) {
		console.log('rektig');
		if (browser) {
			goto('/profile');
		}
	}
</script>

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
		{#if form?.age}
			<p>{form.message}</p>
		{/if}
	</Label>
	<Label class="space-y-2">
		<span>Quote</span>
		<Input type="text" name="quote" placeholder="jeg setter meg ned for blindern OHG" required />
		{#if form?.quote}
			<p>{form.message}</p>
		{/if}
	</Label>

	<Button type="submit" class="w-full1">Oppdater</Button>
</form>
