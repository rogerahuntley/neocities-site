<script context="module" lang="ts">
</script>

<script>
  export let posts;
</script>

{#each posts as post}
  <p>{post.path}</p>
  <p>{post.post.metadata.title}</p>
{/each}
