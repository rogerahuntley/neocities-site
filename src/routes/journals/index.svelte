<script context="module">
	export const load = async ({ fetch }) => {
		const journals = await fetch('/api/journals.json');
		const allJournals = await journals.json();

		return {
			props: {
				journals: allJournals
			}
		};
	};
</script>

<script>
	export let journals;
</script>

<ul>
	{#each journals as journal}
		<li>
			<a href={`/journal/${journal.path}/`}>
				{journal.metadata.title}
			</a>
		</li>
	{/each}
</ul>
