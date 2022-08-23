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

  // this is kind of insane, but i was looking at making an un-hydratable page (javascriptless)
  // basically, svelte will compile a layout and then the page
  // i can't "title" data back up to layout via store because it's already been compiled
  // this will save some hassle at least with my individual pages

  export const getTitle = (path) => {
    var title = path.split('/').filter((i) => i)[0] || 'Home';
    title = title.charAt(0).toUpperCase() + title.slice(1);
    return title;
  };
</script>

<script>
  import Breadcrumbs from '$lib/main/Breadcrumbs.svelte';
  import { title as titleStore } from '@/stores/title.store';
  import { page } from '$app/stores';
  import { browser } from '$app/env';

  let title, headTitle;

  $: titleStore.set(title);
  $: title = getTitle($page.url.pathname);
  $: headTitle = `stealdog - ${title}`;

  let hidden = browser;

  const toggle = () => {
    hidden = !hidden;
  };
</script>

<svelte:head>
  <title>{headTitle}</title>
</svelte:head>

<div id="grid-main">
  <header>
    <a href="/">stealdog</a>
    <span on:click={toggle} id="mobile-menu" class="material-icons">menu</span>
  </header>

  <nav class:hidden>
    <ul class="no-margin">
      <li>
        <a sveltekit:prefetch href="/">home</a>
      </li>
      <li>
        <a sveltekit:prefetch href="/journal/">journal</a>
      </li>
      <li>
        <a sveltekit:prefetch href="/blog/">blog</a>
      </li>
      <li>
        <a sveltekit:prefetch href="/travel/">travel log</a>
      </li>
      <li style="display: none">
        <a sveltekit:prefetch href="/lists/">shrines</a>
      </li>
      <li>
        <a sveltekit:prefetch href="/lists/">lists</a>
      </li>
    </ul>
  </nav>

  <aside>
    <span class="font-title">{title}</span>
  </aside>

  <main>
    <slot />
  </main>

  <footer class="center">
    <span class="hide-mobile">
      <!-- <Breadcrumbs /> -->
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
    overflow: auto;
  }
</style>
