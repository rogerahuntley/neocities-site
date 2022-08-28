<script lang="ts">
  import { PostLink } from '$lib/posts';
  export let title = '';

  export let updatePosts = [];
</script>

<h3>{title}</h3>
{#await updatePosts then updatePosts}
  {#each updatePosts as post}
    <PostLink {post} />
  {/each}
{/await}
<slot />
