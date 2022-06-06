<div id="grid-main">
	<header>roger</header>

	<nav>
		<ul>
			<li>
				<a href="/">home</a>
			</li>
			<li>
				<a href="/journals">journal</a>
			</li>
		</ul>
	</nav>

	<aside>boop!</aside>

	<main>
		<slot />
	</main>

	<footer>huntley</footer>
</div>

<style lang="scss">
	@import 'src/styles/grid-main.scss';
	:global(#grid-main) {
		header,
		footer {
			text-align: center;
		}
	}
</style>
