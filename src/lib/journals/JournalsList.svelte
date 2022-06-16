<script lang="ts">
  import { JournalLink } from './index';
  import type { journal } from '$types/journal.type';
  export let journals: journal[];
</script>

<div class="journals-list">
  <ul>
    {#each journals as journal}
      <li>
        <JournalLink {journal} />
      </li>
    {/each}
  </ul>
</div>
