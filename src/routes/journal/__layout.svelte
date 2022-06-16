<script context="module" lang="ts">
  import { toMonthName } from '$lib/journals';
  import { title } from '$stores/title.store';

  export const load = async ({ fetch }) => {
    const journals = await fetch('/api/journals.json');
    const allJournals = await journals.json();

    return {
      props: {
        journals: allJournals
      }
    };
  };
</script>

<script lang="ts">
  import { page } from '$app/stores';
  import type { journal } from '@/types/journal.type';
  import { setContext } from 'svelte';

  title.set('Journal');

  export let journals: journal[];

  setContext('journals', journals);

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
