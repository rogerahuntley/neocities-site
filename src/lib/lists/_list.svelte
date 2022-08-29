<script>
  import Bubble from '$lib/item/Bubble.svelte';
  export let name = null;
</script>

<Bubble full>
  <span slot="header">
    {name}
  </span>
  <span slot="body" class="lists">
    <slot />
  </span>
</Bubble>

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
