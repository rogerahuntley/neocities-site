<script>
  import * as _Lists from '$lib/lists/index';
  import List from '$lib/lists/_list.svelte';
  const { Articles, Cyber, Friends, Lists, Other, Personal, Tools, ...lists } = _Lists;
</script>

{#each Object.values(lists) as List}
  <svelte:component this={List} />
{/each}

<Articles />
<Cyber />
<Friends />
<Lists />
<Other />
<Personal />
<Tools />
