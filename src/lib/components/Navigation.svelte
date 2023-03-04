<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';
</script>

<Navbar let:hidden let:toggle navClass="bg-reg-red flex flex-nowrap flex-row">
	<NavBrand href="/" class="bg-red-600">
		<span class="self-center whitespace-nowrap text-xl md:text-2xl lg:text-4xl font-semibold dark:text-white">Ultorcs</span
		>
	</NavBrand>
	<NavHamburger on:click={toggle} />
	<NavUl {hidden} class="bg-red-300 w-full ">
		<NavLi
			href="/"
			active={true}
			nonActiveClass=" text-2xl"
			activeClass="text-white text-xl underline ">Home</NavLi
		>
		<NavLi
			href="/horserace"
			nonActiveClass="text-xl"
			activeClass=" text-xl underline">Hesteløp</NavLi
		>
		<NavLi
			href="/overUnder"
			nonActiveClass=" text-xl"
			activeClass=" text-xl underline">Over eller Under</NavLi
		>
		<NavLi
			href="/randomizer"
			nonActiveClass=" text-xl"
			activeClass=" text-xl underline">Randomizer</NavLi
		>
		<NavLi

			nonActiveClass=" text-xl"
			activeClass=" text-xl underline"
			><form action="/logout" method="POST">
				<button type="submit">Log out</button>
			</form></NavLi
		>
	</NavUl>
</Navbar>

