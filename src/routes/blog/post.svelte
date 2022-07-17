<script context="module" lang="ts">
  export const load = async ({ fetch, stuff }) => {
    const _post = await import('@/posts/journal/2022/6/5.svx');

    return {
      props: {
        post: _post.default,
        metadata: _post.metadata
      }
    };
  };
</script>

<script lang="ts">
  export let post;
  export let metadata;
</script>

<svelte:component this={post} layout="post" />
