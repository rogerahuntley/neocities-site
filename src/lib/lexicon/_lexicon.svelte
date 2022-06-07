<script>
	import Folder from '$lib/folder.svelte';
	export let name = null,
		site = null,
		discord = null,
		twitter = null;

	var getAttributes = () => {
		var attributes = [];

		var add = (name, url) => {
			if (url) {
				attributes.push({
					name: name,
					url: url
				});
			}
		};

		add('website', site);
		add('discord', discord);
		add('twitter', twitter);

		return attributes;
	};
</script>

<Folder {name} attributes={getAttributes()}>
	<slot />
</Folder>
