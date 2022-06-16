<script lang="ts">
  export let tag;
</script>

<span class="journal-link-tag">
  {tag}
</span>

<style lang="scss">
  $tag-color: $accent-color;

  .journal-link-tag {
    font-size: 0.4em;
    font-weight: 600;
    border-radius: 0.6em;
    background-color: $tag-color;
    margin-top: 0.4em;
    padding: 0.5em;
  }
</style>
