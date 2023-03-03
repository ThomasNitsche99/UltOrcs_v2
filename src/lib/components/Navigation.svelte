<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';
</script>

<Navbar let:hidden let:toggle navClass="bg-reg-red text-white">
	<NavBrand href="/" class="text-white">
		<span class="self-center whitespace-nowrap text-3xl font-semibold dark:text-white">Ultorcs</span
		>
	</NavBrand>
	<NavHamburger on:click={toggle} />
	<NavUl {hidden}>
		<NavLi
			href="/"
			active={true}
			nonActiveClass="text-white text-2xl"
			activeClass="text-white text-xl underline ">Home</NavLi
		>
		<NavLi
			href="/horserace"
			nonActiveClass="text-white text-xl"
			activeClass="text-white text-xl underline">Hesteløp</NavLi
		>
		<NavLi
			href="/overUnder"
			nonActiveClass="text-white text-xl"
			activeClass="text-white text-xl underline">Over eller Under</NavLi
		>
		<NavLi
			href="/randomizer"
			nonActiveClass="text-white text-xl"
			activeClass="text-white text-xl underline">Randomizer</NavLi
		>
		<NavLi

			nonActiveClass="text-white text-xl"
			activeClass="text-white text-xl underline"
			><form action="/logout" method="POST">
				<button type="submit">Log out</button>
			</form></NavLi
		>
	</NavUl>
</Navbar>
