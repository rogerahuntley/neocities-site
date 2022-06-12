<script context="module" lang="ts">
	import { toMonthName, toMonthInt } from '$lib/journals';

	export const load = async ({ fetch }) => {
		const journals = await fetch('/api/journals.json');
		const allJournals = await journals.json();

		return {
			props: {
				journals: allJournals
			}
		};
	};

	export type nestedDate = {
		[key: string]: journal[];
	};

	export type nestedDates = {
		[key: string]: nestedDate;
	};

	export const filter = (journals: journal[], params: { year?: string; month?: string }) => {
		return journals.filter((journal) => {
			if (!params || (!params.year && !params.month)) return true;

			const date = new Date(journal.metadata.date);
			if (params.year && date.getFullYear() != parseInt(params.year)) return false;
			if (params.month && date.getMonth() + 1 != toMonthInt(params.month)) return false;

			return true;
		});
	};

	export const nestDates = (journals: journal[]) => {
		const dates = {} as nestedDates;
		const undated = [] as journal[];

		journals.forEach((journal: journal) => {
			if (journal && !journal.metadata.date) {
				undated.push(journal);
				return;
			}

			const date = new Date(journal.metadata.date);
			const year = date.getFullYear();
			const month = date.getMonth() + 1;

			var yearA = dates[year] || (dates[year] = {} as nestedDate);
			var monthA = yearA[month] || (yearA[month] = [] as journal[]);

			monthA.push(journal);
		});

		return { dates, undated };
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import type { journal } from '$types/journal.type';
	import { setContext } from 'svelte';
	import { title } from '$stores/title.store';

	export let journals: journal[];

	setContext('journals', journals);
	title.set('Journal');

	let year, month;

	$: if ($page.params) {
		year = $page.params.year;
		month = $page.params.month;
	}
</script>

<div class="journals-header">
	{#if year}
		<a class="journals-back" href={$page.url.pathname.split('/').slice(0, -2).concat('').join('/')}>
			◄
		</a>
		<div class="journals-title">
			{month ? `${toMonthName(month)} ${year}` : year}
		</div>
	{/if}
</div>

<div class="journals">
	<slot />
</div>

<style lang="scss">
	.journals-header {
		display: flex;
		.journals-back {
			content: '◄';
			margin-inline: 0.2rem;
			line-height: 1.4rem;
			padding-right: 0.4em;
		}
	}

	.journals-title {
		font-size: 1.2em;
		text-decoration: underline;
		text-decoration-thickness: 0.05rem;
		text-underline-offset: 0.1rem;
		margin-bottom: 0.4rem;
	}

	:global(.journals) :global(.journals-layer) {
		// don't add ► to first child
		margin-top: 0.3em;
		gap: 0.1em;
	}

	:global(.journals) :global(.journals-layer) :global(.journals-layer) {
		:global(.journals-list) {
			display: flex;

			&:before {
				margin-inline: 0.2rem;
				line-height: 1.2rem;
				font-size: 0.5rem;
				content: '►';
			}
		}
	}
</style>
