<script context="module" lang="ts">
  import { page } from '$app/stores';

  // this is kind of insane, but i was looking at making an un-hydratable page
  // basically, svelte will compile a layout and then the page
  // i can't "title" data back up to layout via store because it's already been compiled
  // this will save some hassle at least with my individual pages

  export const getTitle = (path) => {
    var title = path.split('/').filter((i) => i)[0] || 'Home';
    title = title.charAt(0).toUpperCase() + title.slice(1);
    return title;
  };
</script>

<script lang="ts">
  import { title } from '$stores/title.store';

  let pageName = getTitle($page.url.pathname);

  title.set(pageName);
</script>

{$title}
