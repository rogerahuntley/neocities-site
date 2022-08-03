<script lang="ts">
  import { getPostsByFilter } from '$stores/post.store';
  import { PostLink } from '$lib/posts';

  export let fancy = '';
  export let travel = '';

  // can't use `load` with these... *sigh*
  // but this seems to work fine, and it's static anyway
  export let travelPosts = getPostsByFilter({ travel });
</script>

<h3>{fancy}</h3>
{#await travelPosts then travelPosts}
  {#each travelPosts as post}
    <PostLink {post} />
  {/each}
{/await}
<slot />
