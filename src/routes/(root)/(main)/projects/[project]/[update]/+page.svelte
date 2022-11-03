<script lang="ts">
  import { PostBig } from '$lib/posts';
  export let data;
  const { projects, update } = data;
  const project = update.data.metadata.project;
</script>

<PostBig post={update} extra={`Project: ${projects[project].metadata.title}`} />
