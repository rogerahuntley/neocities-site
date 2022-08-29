<script lang="ts">
  export let data;
  const { project, updates } = data;
</script>

<svelte:component this={project.component} updatePosts={updates} />
