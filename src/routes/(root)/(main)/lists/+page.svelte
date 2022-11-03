<script>
  import * as _Lists from '$lib/lists';
  const { Articles, Cyber, Friends, Lists, Other, Personal, Tools, ...lists } = _Lists;
  const order = [Articles, Cyber, Friends, Lists, Other, Personal, Tools, ...Object.values(lists)];
</script>

<ul>
  {#each order as list}
    <li><svelte:component this={list} /></li>
  {/each}
</ul>
