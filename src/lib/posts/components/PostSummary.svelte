<!-- 
  Post Summary
  Use: show a link for big content, but print out small content
-->
<script lang="ts">
  import type { post as postType } from '$types/post.type';
  import { PostLink, PostTag, PostSmall } from '../';
  export let post: postType;

  const title = post.data.metadata.title;
  const tags = post.data.metadata.tags.split(' ');

  const type = post.data.metadata.size?.split(' ')[0];

  export let dateTile = false;
  let date, formattedDate;
  $: if (dateTile) {
    date = post.data.metadata.date;
    formattedDate = new Date(date).toLocaleDateString('en-us', {
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC'
    });
  }
</script>

<div class="post-summary">
  <div class="header">
    {#if dateTile}
      {formattedDate}
    {:else}
      {title}
    {/if}
    {#if tags.length > 0}
      <span class="tags">
        {#each tags as tag}
          <span class="post-link-tag">
            <PostTag {tag} independent={false} />
          </span>
        {/each}
      </span>
    {/if}
  </div>
  <div class="body">
    {#if type == 'small' || type == 'video'}
      <PostSmall {post} />
    {:else}
      <PostLink {post} hideTag={true} />
    {/if}
  </div>
</div>

<style lang="scss">
  .post-summary {
    display: flex;
    flex-direction: column;
    margin-block: 0.5rem;
    align-items: flex-start;

    .tags {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.2rem;
      margin-left: 0.4rem;
    }

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
      :global(a),
      :global(p),
      :global(iframe) {
        display: block;
        margin: 1em;
      }
    }
  }
</style>
