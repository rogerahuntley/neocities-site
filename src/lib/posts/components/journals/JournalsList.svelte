<script lang="ts">
  import { PostSummary } from '../../';
  import type { journal } from '$types/journal.type';
  export let journals: journal[];
</script>

<div class="journals-list">
  <ul class="no-margin">
    {#each journals as journal}
      <li>
        <PostSummary post={journal} />
      </li>
    {/each}
  </ul>
</div>
