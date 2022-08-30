<script lang="ts">
  // get wanted journals
  import { JournalHeader, JournalsList, JournalsLink, toMonthName } from '$lib/posts';
  import { PostBig } from '$lib/posts';
  import type { nestedDates, journal } from '$types/journal.type';

  export let data;
  var year: number, month: number, day: number, filtered: journal[], dates: nestedDates;
  $: if (data) {
    year = data.year;
    month = data.month;
    day = data.day;
    filtered = data.filtered;
    dates = data.dates;
  }
</script>

{#if day || (filtered.length == 1 && !filtered[0].data.metadata.size.includes('small'))}
  <PostBig post={filtered[0]} />
{:else}
  <!-- {#if year}
    <JournalHeader text={(month ? `${toMonthName(month)} ${year}` : year).toString()} link="../" />
  {/if} -->

  <!-- {#if !year}
    {#each Object.entries(dates) as [year, yearA]}
      <ul class="journals-sort">
        <li>Sort:</li>
        {#each Object.entries(yearA) as [month]}
          <li>
            <JournalsLink {year} {month} />
          </li>
        {/each}
      </ul>
    {/each}
  {/if} -->

  <JournalsList journals={filtered} />
{/if}

<style lang="scss">
  .journals-sort {
    display: flex;
    flex-direction: row;
    gap: 0.3rem;
    flex-wrap: wrap;
    padding-bottom: 0.2rem;
    border-bottom: 4px solid $accent-color;
    margin-bottom: 0.5rem;
    li {
      margin: 0;
    }
  }
</style>
