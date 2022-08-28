<script lang="ts">
  export let data;
  const { project, updates } = data;
  console.log(updates);
</script>

<svelte:component this={project.component} updatePosts={updates} />
