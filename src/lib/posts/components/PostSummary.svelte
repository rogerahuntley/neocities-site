<!-- 
  Post Summary
  Use: show a link for big content, but print out small content
-->
<script lang="ts">
  import type { post as postType } from '$types/post.type';

  import { PostLink } from '../';

  export let post: postType;
  let tags = (post.data.metadata.tags || '')
    .split(' ')
    .filter((i) => i)
    .sort();
</script>

{#if post.data.metadata.layout?.includes('small')}
  <svelte:component this={post.data.default} />
{:else}
  <PostLink {post} />
{/if}

<style lang="scss">
  $tag-color: $accent-color;

  .post-link-tag {
    font-size: 0.4em;
    border-radius: $rounded;
    background-color: $tag-color;
    margin-top: 0.4em;
    padding: 0.5em;
    text-decoration: inherit;
  }

  .post-link {
    line-height: normal;
    a {
      display: flex;
      gap: 0.4em;
      align-items: center;
    }

    .tags {
      display: flex;
      gap: 0.2em;
    }
  }
</style>
