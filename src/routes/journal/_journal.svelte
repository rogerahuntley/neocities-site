<!-- _journal.svelte -->
<script>
	export let title;
	export let date;
</script>

<div class="journal">
	<h1 class="journal-title">{title}</h1>

	<p class="journal-details">Published: {date}</p>

	<slot class="journal-body" />
</div>

<style>
	.journal-title {
		margin: 0;
	}

	.journal-details {
		margin-top: 0.1em;
		margin-bottom: 1em;
	}
</style>
