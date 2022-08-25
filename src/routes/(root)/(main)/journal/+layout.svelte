<div class="journals">
  <slot />
</div>

<style lang="scss">
  .journals {
    :global(.journals-header) {
      display: flex;
      text-transform: capitalize;
      :global(.journals-back) {
        margin-inline: 0.2rem;
        line-height: 1.4rem;
        padding-right: 0.4em;
      }
    }

    :global(.journals-title) {
      @extend .underline;
      font-size: 1.2em;
      margin-bottom: 0.4rem;
    }

    :global(.journals-layer) {
      margin-top: 0.3em;
      gap: 0.1em;
    }
  }
</style>
