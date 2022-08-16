<script lang="ts">
  export let tag: string = '';
  export let independent: boolean = true;
</script>

<div class="post-tag" class:independent>
  {tag}
</div>

<style lang="scss">
  $tag-color: $accent-color;

  .post-tag {
    font-size: 0.6em;
    text-decoration: inherit;
    &.independent {
      border-radius: $rounded;
      background-color: $tag-color;
      margin-top: 0.4em;
      padding: 0.5em;
    }
  }
</style>
