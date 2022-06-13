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
  :global {
    .lists li {
      text-align: right;
      a {
        text-align: left;
      }
      width: 100%;
      display: flex;
      justify-content: space-between;
      gap: 0.3em;
    }
  }
</style>
