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
  const date = post.data.metadata.date;
  const title = post.data.metadata.title;

  const formattedDate = new Date(date).toLocaleDateString('en-us', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  });
</script>

<div class="post-link">
  <div class="header">
    {formattedDate}
    {#if !hideTag}
      <span class="tags">
        {#each tags as tag}
          <span class="post-link-tag">
            {tag}
          </span>
        {/each}
      </span>
    {/if}
  </div>
  <div class="body">
    <a href={`${post.publicPath}/`}>
      {title}
    </a>
  </div>
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

  .post-link {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    align-items: flex-start;

    .header {
      display: flex;
      flex-direction: row;

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
      a {
        padding: 1em;
      }
    }
  }
</style>
