<script lang="ts">
  export let data;
  const { project, updates, journals } = data;
</script>

<svelte:component this={project.component} {updates} {journals} />
