<script context="module" lang="ts">
  export const load = async ({ params, stuff }) => {
    const articles = stuff.articles as blogMap;
    const title = params.title;
    const article = articles[title];

    if (article) {
      return {
        props: {
          article
        }
      };
    } else {
      return {
        status: 302,
        redirect: '/blog/'
      };
    }
  };
</script>

<script lang="ts">
  import { PostBig } from '$lib/posts';
  import type { blog as blogType, blogMap } from '$types/blog.type';
  export let article: blogType;
</script>

<PostBig post={article} />
