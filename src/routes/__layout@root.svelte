<script>
	import Count from '$lib/Count.svelte';
	export let data;

	let hidden = true;

	const toggle = () => {
		hidden = !hidden;
	};
</script>

<div id="grid-main">
	<header>
		stealdog
		<span on:click={toggle} id="mobile-menu" class="material-icons">menu</span>
	</header>

	<nav class:hidden>
		<ul>
			<li>
				<a href="/">home</a>
			</li>
			<li>
				<a href="/journals/">journal</a>
			</li>
		</ul>
	</nav>

	<aside><Count {data} /></aside>

	<main>
		<slot />
	</main>

	<footer />
</div>

<style lang="scss">
	@import 'src/styles/grid-main.scss';

	header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		#mobile-menu {
			font-size: 1.2em;
			@include media('>=tablet') {
				display: none;
			}
		}
	}

	nav ul {
		display: flex;
		flex-direction: column;

		@include media('>=tablet') {
			order: 2;
			gap: 0.4em;
		}
	}

	.hidden {
		@include media('<tablet') {
			display: none;
		}
	}

	main {
		font-weight: 300;
	}
</style>
