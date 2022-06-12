<script lang="ts">
  import type { nestedDates } from './__layout.svelte';
  import type { journal } from '$types/journal.type';
  import { getContext } from 'svelte';
  import { page } from '$app/stores';

  import { nestDates } from './__layout.svelte';
  import { JournalsList, JournalsLink } from '$lib/journals';
  import Year from './[year]/index.svelte';

  let dates: nestedDates, undated: journal[];

  $: if ($page.params) {
    const journals = getContext('journals') as journal[];
    const nD = nestDates(journals);
    (dates = nD.dates), (undated = nD.undated);
  }
</script>

{#if undated.length > 0}
  <div class="journals-layer">
    Undated
    <JournalsList journals={undated} />
  </div>
{/if}
{#each Object.entries(dates) as [year, yearA]}
  <div class="journals-layer">
    <JournalsLink {year} />
    <ul>
      <Year {year} dates={yearA} />
    </ul>
  </div>
{/each}
