<script context="module" lang="ts">
  export const load = async ({ stuff }) => {
    return {
      props: {
        articles: stuff.articles as blogMap
      }
    };
  };
</script>

<script lang="ts">
  import { PostLink, PostSummary } from '$lib/posts';
  import type { blogMap } from '$types/blog.type';
  export let articles: blogMap;
</script>

{#each Object.entries(articles) as [path, article]}
  <PostSummary post={article} />
{/each}
