<script>
  import * as Lists from '$lib/lists/index';
</script>

{#each Object.values(Lists) as List}
  <svelte:component this={List} />
{/each}
