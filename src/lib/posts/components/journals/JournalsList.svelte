<script lang="ts">
  import { PostLink } from '../../';
  import type { post } from '$types/post.type';
  export let journals: post[];
</script>

<div class="journals-list">
  <ul class="no-margin">
    {#each journals as journal}
      <li>
        <PostLink post={journal} />
      </li>
    {/each}
  </ul>
</div>
