<script context="module" lang="ts">
  import { toLocalPath } from '$lib/posts';

  export const load = async ({ params }) => {
    const _path = toLocalPath(params.path);
    const _post = await import(_path); /* vite-ignore */

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
