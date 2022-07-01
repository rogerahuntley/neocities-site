<script>
  import { JournalLink, filter } from '$lib/journals';

  export let fancy = '';
  export let travel = '';
  export let journals = [];

  let filtered = filter(journals, { travel });
</script>

<h3>{fancy}</h3>

{#each filtered as journal}
  <JournalLink {journal} />
{/each}

<slot />
