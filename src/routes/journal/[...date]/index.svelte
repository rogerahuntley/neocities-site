<script context="module" lang="ts">
  // get wanted journals
  import { filter, nestDates } from '$lib/journals';
  import type { journal, nestedDates } from '$types/journal.type';

  export const load = async ({ params, fetch }) => {
    // get page params
    const [year, month, day] = params.date.split('/');

    // pull journal data
    const journalData = await fetch('/api/journals.json');
    const journals = await journalData.json();

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
      const curFiltered = filter(journals, curFilters);

      // get filtered for one page up
      const subFilters = Object.fromEntries(
        Object.entries(filters).filter((e) => valid.slice(0, -1).includes(e[0]))
      );
      const subFiltered = filter(journals, subFilters);

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
      return {
        props: {
          journals,
          year,
          month,
          day
        }
      };
    }
  };
</script>

<script lang="ts">
  // get page params
  import { page } from '$app/stores';

  export let year, month, day;
  $: if ($page.params) {
    [year, month, day] = $page.params.date.split('/');
  }

  // get wanted journals
  import { JournalsList, JournalsLink, toMonthName } from '$lib/journals';
  export let dates: nestedDates = {};
  export let journals: journal[];

  $: {
    const filtered = filter(journals, { year, month });
    dates = nestDates(filtered).dates;
  }

  let beforeNote = true;
  $: beforeNote = !month;
</script>

{#if year}
  <div class="journals-header">
    <a class="journals-back" href={$page.url.pathname.split('/').slice(0, -2).concat('').join('/')}>
      ◄
    </a>
    <div class="journals-title">
      {month ? `${toMonthName(month)} ${year}` : year}
    </div>
  </div>
{/if}
<div class="journals">
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
</div>

<style lang="scss">
  .journals-header {
    display: flex;
    text-transform: capitalize;
    .journals-back {
      margin-inline: 0.2rem;
      line-height: 1.4rem;
      padding-right: 0.4em;
    }
  }

  .journals-title {
    @extend .underline;
    font-size: 1.2em;
    margin-bottom: 0.4rem;
  }

  .journals .journals-layer {
    // don't add ► to first child
    margin-top: 0.3em;
    gap: 0.1em;

    &.beforeNote {
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
  }
</style>
