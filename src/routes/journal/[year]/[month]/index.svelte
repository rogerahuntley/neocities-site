<script context="module" lang="ts">
	import { toMonthInt } from '$lib/journals';

	export const load = async ({ params }) => {
		if (params.month && isNaN(params.month)) {
			return {
				status: 302,
				redirect: `/journal/${params.year}/${toMonthInt(params.month) + 1}/`
			};
		}

		return {
			status: 200
		};
	};
</script>

<script lang="ts">
	import type { journal } from '$types/journal.type';
	import { getContext } from 'svelte';
	import { page } from '$app/stores';

	import { filter } from '../../__layout.svelte';
	import { JournalsList } from '$lib/journals';

	export let year: string;
	export let month: string;
	export let journals: journal[];

	$: if ($page.params) {
		year = year || $page.params.year;
		month = month || $page.params.month;
		journals = filter(getContext('journals') as journal[], { year, month });
	}
</script>

<div class="journals-layer">
	<JournalsList {journals} />
</div>
