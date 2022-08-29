<script>
  // this is so hacky but components can't pre-render and i want the site to work without js
  export let data;
  const { places, travelLogs } = data;
</script>

{#each places as place}
  {@const place_key = place.metadata.travel}
  <svelte:component this={place.component} travelPosts={travelLogs[place_key]} />
{/each}
