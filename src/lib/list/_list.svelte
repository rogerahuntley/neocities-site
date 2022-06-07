<script>
	import Folder from '$lib/folder.svelte';
	export let name = null;
</script>

<Folder {name}>
	<slot />
</Folder>
