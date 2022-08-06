<script context="module">
  import { getPostsByFilter } from '@/stores/post.store';
  export const load = async ({ fetch }) => {
    return {
      props: {
        iceland: await getPostsByFilter({ travel: 'Iceland' }),
        la: await getPostsByFilter({ travel: 'Los Angeles' })
      }
    };
  };
</script>

<script>
  import { Iceland, LA } from '$lib/travel';

  // this is so hacky but components can't pre-render and i want the site to work without js
  export var iceland, la;
</script>

<Iceland travelPosts={iceland} />
<LA travelPosts={la} />
