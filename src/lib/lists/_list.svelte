<script>
  import Folder from '$lib/Folder.svelte';
  export let name = null;
</script>

<Folder {name}>
  <div class="lists">
    <slot />
  </div>
</Folder>

<style lang="scss">
  .lists :global(li) {
    text-align: right;
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 0.3em;
  }

  .lists :global(a) {
    text-align: left;
  }
</style>
