<!-- 
  Post Summary
  Use: show a link for big content, but print out small content
-->
<script lang="ts">
  import Bubble from '../../item/Bubble.svelte';
  import type { post as postType } from '$types/post.type';
  import { PostLink, PostTag, PostSmall } from '../';
  export let post: postType;

  const title = post.data.metadata.title;
  const tags = post.data.metadata.tags.split(' ');

  const type = post.data.metadata.size?.split(' ')[0];

  let date = post.data.metadata.date,
    formattedDate;
  export let dateTile = !!date;
  $: if (dateTile) {
    date = post.data.metadata.date;
    formattedDate = new Date(date).toLocaleDateString('en-us', {
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC'
    });
  }
</script>

<Bubble>
  <span class="header" slot="header">
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
  </span>
  <span slot="body">
    {#if type == 'small' || type == 'video'}
      <PostSmall {post} />
    {:else}
      <PostLink {post} hideTag={true} />
    {/if}
  </span>
</Bubble>

<style lang="scss">
  .header {
    display: flex;
    flex-direction: row;
  }
  .tags {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.2rem;
    margin-left: 0.4rem;
  }
</style>
