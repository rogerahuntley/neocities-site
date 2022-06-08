<script lang="ts">
	import { attr } from 'svelte/internal';

	type attribute = {
		url: string;
		name: string;
	};

	export let attributes: attribute[] = [];

	export let name;

	let hidden = true;

	const toggle = () => {
		hidden = !hidden;
	};
</script>

<div class="folder">
	<button class="folder-name" class:hidden on:click={toggle}>
		{name}
		{#if hidden}
			<span class="material-icons">book</span>
		{:else}
			<span class="material-icons">menu_book</span>
		{/if}
	</button>
	{#if !hidden}
		<aside class="folder-body">
			<blockquote class="folder-attributes">
				<ul>
					{#each attributes as attr}
						<li>
							<a class="folder-attribute" href={attr.url}>{attr.name}</a>
						</li>
					{/each}
				</ul>
				<slot />
			</blockquote>
		</aside>
	{/if}
</div>

<style lang="scss">
	$folder-color: $accent-color;

	.folder {
		margin-block: 0.2em;
	}

	.folder-body {
		margin-top: -1px;
	}

	.folder-attributes ul {
		display: flex;
		flex-direction: row;
		gap: 0.5em;
	}

	.folder-name {
		background-color: $folder-color;
		padding: 0.2em 0.5em;
		border-radius: 0.6em 0.6em 0 0;

		.material-icons {
			font-size: 1em;
		}

		&.hidden {
			border-radius: 0.6em;
		}
	}

	blockquote {
		margin: 0;
		padding: 1em;
		border-radius: 0 0.6em 0.6em 0.6em;
		background-color: $folder-color;
	}
</style>
