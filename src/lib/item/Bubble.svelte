<!-- 
  Bubble
  Use: show a bubble with a header and content
-->
<script>
  export let full = false;
</script>

<div class="bubble">
  <div class="header">
    <slot name="header" />
  </div>
  <div class="body" class:full>
    <slot name="body" />
  </div>
</div>

<style lang="scss">
  .bubble {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &:not(:first-child) {
      margin-top: 0.5rem;
    }

    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }

    .header {
      font-size: 0.7rem;
      border-radius: $rounded;
      background-color: $accent-color;
      margin-left: 1.5rem;
      margin-bottom: -0.5rem;
      padding: 0.5rem;
      z-index: 1;
    }

    .body {
      border-radius: $rounded;
      background-color: $accent-color;
      font-size: 1rem;

      @include media('<tablet') {
        max-width: 100%;
        :global(iframe) {
          max-width: 100%;
          height: auto;
        }
      }

      & > :global(*) {
        margin: 1em;
        display: block;
        margin: 1em;
      }

      &.full {
        width: 100%;
      }

      :global(iframe) {
        display: block;
      }
    }
  }
</style>
