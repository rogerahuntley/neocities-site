<script context="module" lang="ts">
  // get wanted journals
  import { JournalHeader, JournalsList } from '$lib/posts';
  import { filterPosts } from '$stores/post.store';

  export const load = async ({ params, stuff }) => {
    const tag = params.tag;

    // pull journal data
    const journals = stuff.journals;

    const tagJournals = filterPosts(journals, { tag });

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
