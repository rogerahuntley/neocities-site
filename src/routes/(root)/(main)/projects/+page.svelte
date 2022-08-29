<script>
  import { ProjectLink } from '$lib/projects';
  export let data;
  const projectMapByType = data.projectsByType;

  const typeMap = {
    game: 'Game Projects:',
    web: 'Web Projects:',
    experiment: 'Experiments:'
  };
</script>

<!-- We use typeMap as our index so that we can easily order the groups in the view -->
{#each Object.entries(typeMap) as [type, alias]}
  {#if projectMapByType[type]}
    {@const projects = projectMapByType[type]}
    <div class="project {type}">
      <h4 class="project-title">{alias}</h4>

      <ul class="project-links">
        {#each projects as project}
          <li><ProjectLink {project} /></li>
        {/each}
      </ul>
    </div>
  {/if}
{/each}
