<script lang="ts">
  import type { journal } from '$types/journal';
  import { JournalTag } from './index';

  export let journal: journal;
  let tags = (journal.metadata.tags || "").split(" ").filter(i => i).sort();
</script>

<div class="journal-link">
  <a href={`/journal/${journal.path}/`}>
    {journal.metadata.title}
    <span class="tags">
      {#each tags as tag}
        <JournalTag {tag} />
      {/each}
    </span>
  </a>
</div>

<style lang="scss">
  .journal-link {
    a {
      display: flex;
      flex-wrap: wrap;
      gap: .2em;
      align-items: center;
      justify-content: space-between;
      * {
        flex: 1 0 auto;
      }
    }

    .tags {
      display: flex;
      gap: .2em;
    }
  }
</style>
