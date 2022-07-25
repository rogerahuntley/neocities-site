<script context="module" lang="ts">
  // get wanted journals
  import { JournalHeader, JournalsList, filter } from '$lib/posts';

  export const load = async ({ params, stuff }) => {
    const tag = params.tag;

    // pull journal data
    const journals = stuff.journals;

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

<JournalHeader text={tag} link="/journal" />
<ul class="journals-layer tags">
  <JournalsList {journals} />
</ul>
