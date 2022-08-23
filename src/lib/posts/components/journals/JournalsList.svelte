<script lang="ts">
  import { PostSummary } from '../../';
  import type { journal } from '$types/journal.type';
  export let journals: journal[];
</script>

<ul class="journals-list">
  {#each journals as journal}
    <li>
      <PostSummary post={journal} />
    </li>
  {/each}
</ul>
