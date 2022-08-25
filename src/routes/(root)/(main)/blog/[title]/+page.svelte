<script lang="ts">
  import { PostBig } from '$lib/posts';
  import type { blog as blogType, blogMap } from '$types/blog.type';

  export let data;
  const { article } = data;
</script>

<PostBig post={article} />
