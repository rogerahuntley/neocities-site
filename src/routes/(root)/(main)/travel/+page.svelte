<script>
  import { Iceland, LA } from '$lib/travel';

  // this is so hacky but components can't pre-render and i want the site to work without js
  export let data;
  const { iceland, la } = data;
</script>

<Iceland travelPosts={iceland} />
<LA travelPosts={la} />
