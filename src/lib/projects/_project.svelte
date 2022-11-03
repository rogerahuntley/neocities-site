<script lang="ts">
  import Bubble from '$lib/item/Bubble.svelte';
  import { PostLink } from '$lib/posts';
  export let title = '';
  export let link;
  export let updates = [];
  export let journals = [];
</script>

<Bubble>
  <span slot="header">
    <!-- title -->
    <h3>
      {title}
    </h3>
  </span>
  <span slot="body">
    {#if link}
      link to: <a href={link}>{title}</a>
    {/if}
    <!-- content -->
    <slot />
  </span>
</Bubble>

<!-- updates -->
{#if updates && updates.length > 0}
  <Bubble>
    <h4 slot="header">Update Log</h4>
    <ul slot="body">
      {#each updates as post}
        <li><PostLink {post} hideTag /></li>
      {/each}
    </ul>
  </Bubble>
{/if}

<!-- related journals -->
{#if journals && journals.length > 0}
  <Bubble>
    <h4 slot="header">Related Journals</h4>
    <ul slot="body">
      {#each journals as post}
        <li><PostLink {post} /></li>
      {/each}
    </ul>
  </Bubble>
{/if}
