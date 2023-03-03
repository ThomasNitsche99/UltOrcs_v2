<script lang="ts">
	import { Label, Input, Helper, Button } from 'flowbite-svelte';
	import type { ActionData } from './login/$types';
	export let form: ActionData;
</script>

<form action="?/login" method="POST">
	<div class="mb-6">
		<Label for="large-input" class="block mb-2">Username</Label>
    <Input let:props id="large-input" size="lg" placeholder="Orcname">
      <input type="text" {...props} name="username" required/>
    </Input>
		<Label for="large-input" class="block mb-2">Password</Label>
    <Input let:props id="large-input" size="lg" placeholder="Password">
      <input type="password" {...props} name="password" required/>
    </Input>
		{#if form?.invalid}
			<Helper class="mt-2" color="red"
				><span class="font-medium">Error!</span> Provide both username and password.</Helper
			>
		{/if}
    {#if form?.credentials}
		<Helper class="mt-2" color="red"
				><span class="font-medium">Error!</span> Wrong credentials provided</Helper
			>
	{/if}
	</div>
  <Button type="submit">Log in</Button>
  <Button href="/register">Register</Button>
</form>


