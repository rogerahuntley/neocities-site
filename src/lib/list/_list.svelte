<script>
	import Folder from '$lib/Folder.svelte';
	export let name = null;
</script>

<Folder {name}>
	<slot />
</Folder>
