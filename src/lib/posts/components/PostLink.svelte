<!--
  Post Link
  Use: Links to an individual post, tags shown
-->
<script lang="ts">
  import type { post as postType } from '$types/post.type';

  export let post: postType;
  export let hideTag = false;
  let tags = (post.data.metadata.tags || '')
    .split(' ')
    .filter((i) => i)
    .sort();
</script>

<div class="post-link">
  <a href={`${post.publicPath}/`}>
    {post.data.metadata.title}
    {#if !hideTag}
      <span class="tags">
        {#each tags as tag}
          <span class="post-link-tag">
            {tag}
          </span>
        {/each}
      </span>
    {/if}
  </a>
</div>

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
