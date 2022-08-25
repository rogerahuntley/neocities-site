<script>
  import { page } from '$app/stores';

  export let data;
  let title = $page.data.title || 'Home';
</script>

<svelte:head>
  <title>stealdog - {title}</title>
</svelte:head>

<slot />

<style lang="scss">
  @import 'src/styles/app.scss';
</style>
