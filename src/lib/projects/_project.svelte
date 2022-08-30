<script lang="ts">
  import Bubble from '$lib/item/Bubble.svelte';
  import Folder from '$lib/item/Folder.svelte';
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
      {#if link}
        <a href={link}>🔗</a>
      {/if}
    </h3>
  </span>
  <span slot="body">
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
