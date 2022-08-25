<script lang="ts">
  import { PostSummary } from '$lib/posts';
  import type { blogMap } from '$types/blog.type';

  export let data;
  const { articles }: { articles: blogMap } = data;
</script>

{#each Object.entries(articles) as [path, article]}
  <PostSummary post={article} />
{/each}
