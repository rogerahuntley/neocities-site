<script lang="ts">
  import type { journal, nestedDate } from '$types/journal.type';
  import { getContext } from 'svelte';
  import { page } from '$app/stores';

  import { JournalsLink, filter, nestDates } from '$lib/journals';

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
