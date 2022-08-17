<script lang="ts">
  import { PostSummary } from '../../';
  import type { journal } from '$types/journal.type';
  export let journals: journal[];
</script>

<ul class="journals-list no-margin">
  {#each journals as journal}
    <li>
      <PostSummary post={journal} dateTile={true} />
    </li>
  {/each}
</ul>

<style lang="scss">
  .journals-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
</style>
