<script context="module" lang="ts">
  import { mapBlog } from '$lib/posts';
  export const load = async ({ stuff }) => {
    // get blog data
    const articles = await mapBlog();

    return {
      stuff: {
        ...stuff,
        articles
      }
    };
  };
</script>

<div class="articles">
  <slot />
</div>
