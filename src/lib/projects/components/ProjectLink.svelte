<script lang="ts">
  import type { project } from '$types/project.type';
  export let project: project;
</script>

<a href="/projects/{project.metadata.project}">{project.metadata.title}</a>
