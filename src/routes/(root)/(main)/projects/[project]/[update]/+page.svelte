<script lang="ts">
  import { PostBig } from '$lib/posts';
  export let data;
  const { update } = data;
</script>

<PostBig post={update} />
