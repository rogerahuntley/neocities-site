<script context="module" lang="ts">
  export const load = async ({ fetch, stuff }) => {
    // pull journal data
    const journalData = await fetch('/api/journals.json');
    const journals = await journalData.json();

    return {
      props: {
        journals
      },
      stuff: {
        ...stuff,
        journals
      }
    };
  };
</script>

<script lang="ts">
  import type { journal } from '$types/journal.type';
  import { setContext } from 'svelte';

  export let journals: journal[];

  setContext('journals', journals);
</script>

{JSON.stringify(journals)}
