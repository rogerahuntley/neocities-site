<!--
  Post Big
  Use: This is a big post, usually linked to and standing on it's own
-->
<script lang="ts">
  import Bubble from '$lib/item/Bubble.svelte';
  import type { post as postType } from '$types/post.type';
  export let post: postType;
  export let extra = '';
  console.log(extra);
  const title = post.data.metadata.title;
  const date = post.data.metadata.date;

  const formattedDate = new Date(date).toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  });
</script>

<div class="post big">
  <Bubble>
    <span slot="header">
      <h1 class="post-title">{title}</h1>
      <p class="post-details">{formattedDate}</p>
      {#if extra}
        <p class="post-details">{extra}</p>
      {/if}
    </span>
    <span slot="body">
      <svelte:component this={post.data.default} class="post-body" />
    </span>
  </Bubble>
</div>

<style lang="scss">
  .post-title {
    margin: 0;
  }

  .post-details {
    margin-block: 0.1em;
    &:last-child {
      margin-bottom: 1em;
    }
  }
</style>
