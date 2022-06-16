<script lang="ts">
  import { page } from '$app/stores';
  import { toMonthName } from '$lib/journals';

  let path: string[] = [];
  let links: string[] = [];

  $: if ($page) {
    links = [];
    if ($page.url.pathname.length > 0) {
      path = $page.url.pathname.split('/').filter((i) => i);

      if (path[0] == 'journal' && path[2]) {
        // set month to readable
        path[2] = toMonthName(path[2]);
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
    <a href={link}>{path[i]}</a>
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

  .arrow {
    margin-inline: 0.2rem;
    line-height: 1rem;
    font-size: 0.6rem;
  }
</style>
