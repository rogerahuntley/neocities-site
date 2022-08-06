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

<div class="post">
  <h1 class="post-title">{title}</h1>

  <p class="post-details">{formattedDate}</p>

  <slot class="post-body" />
</div>

<style lang="scss">
  .post-title {
    margin: 0;
  }

  .post-details {
    margin-top: 0.1em;
    margin-bottom: 1em;
  }
</style>
