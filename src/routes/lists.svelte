<script context="module">
  import { title } from '$stores/title.store';
  title.set('Lists');
</script>

<script>
  import * as Lists from '$lib/lists/index';
  title.set('Lists');
</script>

{#each Object.values(Lists) as List}
  <svelte:component this={List} />
{/each}
