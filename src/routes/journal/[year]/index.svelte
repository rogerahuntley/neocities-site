<script lang="ts">
  import type { nestedDate } from '../__layout.svelte';
  import type { journal } from '$types/journal.type';
  import { getContext } from 'svelte';
  import { page } from '$app/stores';

  import { filter, nestDates } from '../__layout.svelte';
  import { JournalsLink } from '$lib/journals';

  import Month from './[month]/index.svelte';

  export let year: string;
  export let dates: nestedDate = {};

  $: if ($page.params) {
    year = year || $page.params.year;
    const filtered = filter(getContext('journals') as journal[], { year });
    dates = nestDates(filtered).dates[year] || {};
  }
</script>

<slot />
<ul>
  {#each Object.entries(dates) as [month, monthA]}
    <li>
      <div class="journals-layer">
        <JournalsLink {year} {month} />
        <Month {year} {month} journals={monthA} />
      </div>
    </li>
  {/each}
</ul>
