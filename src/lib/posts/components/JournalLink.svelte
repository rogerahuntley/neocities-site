<script lang="ts">
  import type { journal as journalType } from '$types/journal.type';
  import { JournalTag } from './index';

  export let journal: journalType;
  export let hideTag = false;
  let tags = (journal.metadata.tags || '')
    .split(' ')
    .filter((i) => i)
    .sort();
</script>

<div class="journal-link">
  <a href={`/journal/${journal.path}/`}>
    {journal.metadata.title}
    {#if !hideTag}
      <span class="tags">
        {#each tags as tag}
          <JournalTag {tag} />
        {/each}
      </span>
    {/if}
  </a>
</div>

<style lang="scss">
  .journal-link {
    line-height: normal;
    a {
      display: flex;
      gap: 0.4em;
      align-items: center;
      justify-content: space-between;
      * {
        flex: 1 0 auto;
      }
    }

    .tags {
      display: flex;
      gap: 0.2em;
    }
  }
</style>
