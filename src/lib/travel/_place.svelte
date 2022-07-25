<script>
  import { PostLink, filter } from '$lib/posts';

  export let fancy = '';
  export let travel = '';
  export let journals = [];

  let filtered = filter(journals, { travel });
</script>

<h3>{fancy}</h3>

{#each filtered as journal}
  <PostLink {journal} />
{/each}

<slot />
