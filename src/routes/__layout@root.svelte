<script context="module">
  export const load = async ({ fetch }) => {
    const sitedata = await fetch('/api/neocities.json');
    const sitedataJson = await sitedata.json();

    return {
      props: {
        data: sitedataJson
      }
    };
  };
</script>

<script>
  import Breadcrumbs from '$lib/main/Breadcrumbs.svelte';

  import { title } from '@/stores/title.store';

  let hidden = true;

  const toggle = () => {
    hidden = !hidden;
  };
</script>

<svelte:head>
  <title>stealdog - {$title}</title>
</svelte:head>

<div id="grid-main">
  <header>
    stealdog
    <span on:click={toggle} id="mobile-menu" class="material-icons">menu</span>
  </header>

  <nav class:hidden>
    <ul>
      <li>
        <a href="/">home</a>
      </li>
      <li>
        <a href="/journal/">journal</a>
      </li>
      <li>
        <a href="/lists/">lists</a>
      </li>
    </ul>
  </nav>

  <aside>
    {$title}
  </aside>

  <main>
    <slot />
  </main>

  <footer class="center">
    <span class="hide-mobile">
      <Breadcrumbs />
    </span>
  </footer>
</div>

<style lang="scss">
  @import 'src/styles/grid-main.scss';

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    #mobile-menu {
      font-size: 1.2em;
      cursor: pointer;
      @include media('>=tablet') {
        display: none;
      }
    }
  }

  nav ul {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    @include media('>=tablet') {
      align-items: flex-start;
      order: 2;
    }
  }

  .hidden {
    @include media('<tablet') {
      display: none;
    }
  }

  main {
    font-weight: 300;
  }
</style>
