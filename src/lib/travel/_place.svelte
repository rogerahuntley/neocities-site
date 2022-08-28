<script lang="ts">
  import { PostLink } from '$lib/posts';

  export let fancy = '';
  export let travel = '';

  export let travelPosts = [];
</script>

<h3>{fancy}</h3>
{#await travelPosts then travelPosts}
  {#each travelPosts as post}
    <PostLink {post} />
  {/each}
{/await}
<slot />
