<script lang="ts">
  import { page } from '$app/stores';
  import { toMonthName, toMonthInt } from '$lib/posts';

  let path: string[] = [];
  let aliasPath: string[] = []; // used to change the display, maps aliasPath[2] => path[2], June => 6
  let links: string[] = [];

  $: if ($page) {
    links = [];
    if ($page.url.pathname.length > 0) {
      path = $page.url.pathname.split('/').filter((i) => i);

      if (path[0] && path[0].toLowerCase() == 'journal' && path[2]) {
        // set month to readable
        aliasPath[2] = toMonthName(path[2]);
      }

      // break into links
      for (let i = 0; i < path.length; i++) {
        links.push('/' + path.slice(0, i + 1).join('/'));
      }
    }
  }
</script>

<div class="breadcrumbs">
  {#each links as link, i}
    <a sveltekit:reload class="breadcrumb" href={link}>{aliasPath[i] || path[i]}</a>
    {#if i < links.length - 1}
      <span class="arrow">➜</span>
    {/if}
  {/each}
</div>

<style>
  .breadcrumbs {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  }

  .breadcrumb::first-letter {
    text-transform: capitalize;
  }

  .arrow {
    margin-inline: 0.2rem;
    line-height: 1rem;
    font-size: 0.6rem;
  }
</style>
