<!-- _post.svelte -->
<script>
  export let title;
  export let date;

  let formattedDate = new Date(date).toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  });
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="journal">
  <h1 class="journal-title">{title}</h1>

  <p class="journal-details">{formattedDate}</p>

  <slot class="journal-body" />
</div>

<style lang="scss">
  .journal-title {
    margin: 0;
  }

  .journal-details {
    margin-top: 0.1em;
    margin-bottom: 1em;
  }
</style>
