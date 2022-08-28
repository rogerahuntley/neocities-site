<script>
  import { ProjectLink } from '$lib/projects';
  export let data;
  const projectMap = data.projects;
</script>

<ul class="project-links">
  {#each Object.entries(projectMap) as [title, project]}
    <li><ProjectLink {project} /></li>
  {/each}
</ul>
