<!--
  Post Small
  Use: This is a small post, usually embedded in a list and not standing on it's own
-->
<script lang="ts">
  import type { post as postType } from '$types/post.type';
  export let post: postType;
</script>

<div class="post-small">
  <svelte:component this={post.data.default} />
</div>

<style lang="scss">
  .post-small {
    font-size: 0.8rem;
  }
</style>
