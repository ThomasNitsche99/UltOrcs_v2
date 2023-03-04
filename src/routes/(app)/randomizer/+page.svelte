<script lang="ts">
    import { Label, ButtonGroup, InputAddon, Input , Button} from 'flowbite-svelte';
</script>

<!-- bruk badges flowbite -->

<!-- mother div -->
<div class=" w-full flex items-center justify-center bg-red-200">
	<!-- cover -->
	<div class="bg-blue-600 w-full md:w-3/4 flex flex-col justify-center items-center">
		<!-- input field -->
		<div class="w-[90%] md:w-1/2 ">
			<form action="">
				<div class="pt-8">
					<Label for="input-addon" class="mb-2 text-center text-xl text-white">WRITE INN THE NAMES OF THE BOIS</Label>
					<ButtonGroup class="w-full">
						<InputAddon>&</InputAddon>
						<Input id="input-addon" type="email" placeholder="orcname" />
						<Button color="red">Add</Button>
					</ButtonGroup>
				</div>
			</form>
		</div>
		<!-- plotted names -->
		<div class="bg-white h-[400px] w-11/12 my-10 md:w-3/4 ">
            hallo
        </div>
		<!-- button div -->
        <div>
            buttons
        </div>
		<div />
	</div>
</div>
