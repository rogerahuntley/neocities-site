<script context="module" lang="ts">
  import { journals } from '@/posts';
  export const load = async () => {
    return {
      props: {
        posts: await journals
      }
    };
  };
</script>

<script>
  export let posts;
</script>

{#each posts as post}
  <p>{post.path}</p>
  <p>{post.post.metadata.title}</p>
{/each}
