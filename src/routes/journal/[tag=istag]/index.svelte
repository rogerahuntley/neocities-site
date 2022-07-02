<script context="module" lang="ts">
  // get wanted journals
  import { JournalsList, filter, nestDates } from '$lib/journals';
  import type { journal, nestedDates } from '$types/journal.type';

  export const load = async ({ params, fetch }) => {
    const tag = params.tag;

    // pull journal data
    const journalData = await fetch('/api/journals.json');
    const journals = await journalData.json();
    const tagJournals = filter(journals, { tag });

    return {
      props: {
        journals: tagJournals,
        tag
      }
    };
  };
</script>

<script lang="ts">
  export let journals;
  export let tag;
</script>

{#if tag}
  <div class="journals-header">
    <a class="journals-back" href="/journal"> ◄ </a>
    <div class="journals-title">
      {tag}
    </div>
  </div>
{/if}
<div class="journals">
  <ul class="journals-layer tags">
    <JournalsList {journals} />
  </ul>
</div>

<style lang="scss">
  .journals-header {
    display: flex;
    text-transform: capitalize;
    .journals-back {
      margin-inline: 0.2rem;
      line-height: 1.4rem;
      padding-right: 0.4em;
    }
  }

  .journals-title {
    @extend .underline;
    font-size: 1.2em;
    margin-bottom: 0.4rem;
  }

  .journals .journals-layer {
    // don't add ► to first child
    margin-top: 0.3em;
    gap: 0.1em;
  }
</style>
