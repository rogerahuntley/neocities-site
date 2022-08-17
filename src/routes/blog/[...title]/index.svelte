<script context="module" lang="ts">
  export const load = async ({ params, stuff }) => {
    // get page params
    const title = params.title;

    // pull articles data
    const articles = stuff.articles;

    return {
      props: {
        articles
      }
    };
  };
</script>

<script lang="ts">
  import { PostLink } from '$lib/posts';
  import { blogStore } from '$stores/blog.store';
  export let articles;
</script>

{#each articles as article}
  <PostLink post={article} />
{/each}
