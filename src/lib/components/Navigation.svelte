<script lang="ts">
	import { goto } from '$app/navigation';
	import { NavbarData, NavbarItem } from '$lib/model/navbaritems';
	import { Img, P, Toolbar, ToolbarButton } from 'flowbite-svelte';
	import { ArrowRightOnRectangle, Scale, User } from 'svelte-heros-v2';

	const horserace = new NavbarItem('Horserace', 'horserace');
	const overUnder = new NavbarItem('Over eller under', 'overUnder');
	const randomizer = new NavbarItem('Randomizer', 'randomizer');

	const navbar = new NavbarData([horserace, overUnder, randomizer]);
	let key = true;

	function changeActive(value: string) {
		navbar.setActiveItem(value);
		key = !key;
	}
</script>

{#key key}
	<!-- navbar -->
	<div class=" w-full h-[80px] bg-reg-red flex flex-row items-center">
		<!-- logo -->
		<div class="flex flex-row items-center h-full w-1/6 ">
			<!-- logo -->
			<div class="w-[80px] h-full">
				<a href="/" on:click={() => changeActive('')}>
					<Img src="/images/ultorcs.PNG" alt="sample 1" class="w-full h-full" />
				</a>
			</div>
			<!-- tekst -->
			<div class=" ml-4">
				<a href="/" on:click={() => changeActive('')} class="text-2xl font-black italic text-white">
					ULTORCS
				</a>
			</div>
		</div>

		<!-- routes -->
		<div class="flex flex-row  h-full items-center justify-evenly w-2/3">
			{#each navbar.items as item}
				<div>
					{#if navbar.getActiveItem() === item.value}
						<a
							href={item.href}
							class="text-2xl font-black italic underline"
							on:click={() => changeActive(item.value)}>{item.value}</a
						>
					{:else}
						<a
							href={item.href}
							class="text-2xl font-black italic text-white"
							on:click={() => changeActive(item.value)}>{item.value}</a
						>
					{/if}
				</div>
			{/each}
		</div>

		<!-- buttons -->
		<div class="h-full items-center flex justify-center flex-1">
			<Toolbar color="red" class="bg-reg-red border-none">
				<div >
					<ToolbarButton class="text-black" on:click={()=>goto('/profile')}><User solid    /></ToolbarButton>
				</div>
				<div>
					<ToolbarButton class="text-black mx-4 "><Scale solid /></ToolbarButton>
				</div>
				<div>
					<ToolbarButton class=" text-black "
						><form action="/logout" method="POST">
							<button type="submit" class="items-center flex justify-center"
								><ArrowRightOnRectangle solid /></button
							>
						</form>
					</ToolbarButton>
				</div>
			</Toolbar>
		</div>
	</div>
{/key}
