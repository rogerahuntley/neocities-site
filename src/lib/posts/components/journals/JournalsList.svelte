<script lang="ts">
  import { PostLink } from '../../';
  import type { journal } from '$types/journal.type';
  export let journals: journal[];
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
