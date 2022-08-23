<script context="module" lang="ts">
  export const load = async ({ params, stuff }) => {
    // get page params
    const [year, month, day] = params.date.split('/').filter((i) => i != '');

    // pull journal data, filter journals without dates
    const journals = stuff.journals.filter((j) => j.data.metadata.date);

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
      const filtered = filterPosts(journals, { year, month, day }).reverse();
      const dates = nestDates(filtered).dates;

      return {
        props: {
          filtered,
          dates,
          year,
          month,
          day
        }
      };
    }
  };
</script>

<script lang="ts">
  // get wanted journals
  import { JournalHeader, JournalsList, JournalsLink, nestDates, toMonthName } from '$lib/posts';
  import { PostBig } from '$lib/posts';
  import type { nestedDates, journal } from '$types/journal.type';
  import { filterPosts } from '$stores/post.store';

  export let year: number, month: number, day: number;
  export let filtered: journal[];
  export let dates: nestedDates = {};
</script>

{#if day || (filtered.length == 1 && !filtered[0].data.metadata.size.includes('small'))}
  <PostBig post={filtered[0]} />
{:else}
  {#if year}
    <JournalHeader text={(month ? `${toMonthName(month)} ${year}` : year).toString()} link="../" />
  {/if}

  {#if !year}
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
  {/if}

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
