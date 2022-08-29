<script lang="ts">
  import { PostSummary } from '$lib/posts';
  import type { blog_map } from '$types/blog.type';

  export let data;
  const { articles }: { articles: blog_map } = data;
</script>

{#each Object.entries(articles) as [path, article]}
  <PostSummary post={article} />
{/each}
