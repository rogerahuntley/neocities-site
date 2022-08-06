<script context="module" lang="ts">
  export const load = async ({ params, stuff }) => {
    // get page params
    const [year, month, day] = params.date.split('/').filter((i) => i != '');

    // pull journal data
    const journals = stuff.journals;

    // if we go forward we skip the year page, but if we go 'back' we won't, so let's check to see if we should reroute
    let backSteps = 0;
    let stop = false;

    // get parameters we can check
    const filters = { year, month };
    const valid = Object.keys(filters).filter((k) => filters[k]);

    while (!stop && valid.length > 0) {
      // get filtered for this page
      const curFilters = Object.fromEntries(
        Object.entries(filters).filter((e) => valid.includes(e[0]))
      );
      const curFiltered = filterPosts(journals, curFilters);

      // get filtered for one page up
      const subFilters = Object.fromEntries(
        Object.entries(filters).filter((e) => valid.slice(0, -1).includes(e[0]))
      );
      const subFiltered = filterPosts(journals, subFilters);

      // go up one dir if contents are the same
      if (curFiltered.length == subFiltered.length) {
        backSteps++;
        valid.pop();
      } else {
        stop = true;
      }
    }

    // check if how far back we should redirect
    if (backSteps > 0) {
      return {
        status: 302,
        redirect: Array(backSteps).fill('../').join('')
      };
    } else {
      const filtered = filterPosts(journals, { year, month, day });
      const dates = nestDates(filtered).dates;

      return {
        props: {
          dates,
          year,
          month,
          day,
          beforeNote: !month
        }
      };
    }
  };
</script>

<script lang="ts">
  // get wanted journals
  import { JournalHeader, JournalsList, JournalsLink, nestDates, toMonthName } from '$lib/posts';
  import type { nestedDates } from '$types/journal.type';
  import { filterPosts } from '$stores/post.store';

  export let year: number, month: number, day: number;
  export let dates: nestedDates = {};
  export let beforeNote: boolean = true;
</script>

{#if day && dates[year][month].length > 0}
  <svelte:component this={dates[year][month][0].data.default} />
{:else}
  {#if year}
    <JournalHeader text={(month ? `${toMonthName(month)} ${year}` : year).toString()} link="../" />
  {/if}
  <ul class="journals-layer year">
    {#each Object.entries(dates) as [year, yearA]}
      {#if Object.keys(dates).length > 1}
        <JournalsLink {year} />
      {/if}
      <li>
        <ul class="journals-layer month">
          {#each Object.entries(yearA) as [month, monthA]}
            {#if month && Object.keys(yearA).length > 1}
              <JournalsLink {year} {month} />
            {/if}
            <li>
              <div class="journals-layer day" class:beforeNote>
                <JournalsList journals={monthA} />
              </div>
            </li>
          {/each}
        </ul>
        <ul />
      </li>
    {/each}
  </ul>
{/if}

<style lang="scss">
  .beforeNote {
    :global(.journals-list) {
      display: flex;
    }

    > :global(*:before) {
      margin-inline: 0.2rem;
      line-height: 1.2rem;
      font-size: 0.5rem;
      content: '►';
    }
  }
</style>
