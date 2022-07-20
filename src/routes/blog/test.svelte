<script context="module" lang="ts">
  import { getPost } from '@/posts';
  export const load = async () => {
    const post = await getPost('./articles/test.svx');
    return {
      props: {
        post: post.default
      }
    };
  };
</script>

<script>
  export let post;
</script>

<svelte:component this={post} />
