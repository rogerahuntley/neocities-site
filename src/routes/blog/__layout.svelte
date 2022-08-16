<script context="module" lang="ts">
  import { getPostsByFilter } from '@/stores/post.store';
  export const load = async ({ stuff }) => {
    // get blog data
    const articles = await getPostsByFilter({ type: 'article' });

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
