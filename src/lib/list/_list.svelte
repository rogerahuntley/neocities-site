<script>
	export let name = null;
	let hidden = true;

	const toggle = () => {
		hidden = !hidden;
	};
</script>

<button on:click={toggle}>{name}</button>
{#if !hidden}
	<aside>
		<slot />
	</aside>
{/if}
