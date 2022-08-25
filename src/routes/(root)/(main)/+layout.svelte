<script>
  import { page } from '$app/stores';
  import { browser } from '$app/env';

  let hidden = browser;

  const toggle = () => {
    hidden = !hidden;
  };
</script>

<div id="grid-main">
  <header>
    <a sveltekit:reload href="/">stealdog</a>
    <span on:click={toggle} id="mobile-menu" class="material-icons">menu</span>
  </header>

  <nav class:hidden>
    <ul class="no-margin">
      <li style="display: none">
        <a sveltekit:reload sveltekit:prefetch href="/">home</a>
      </li>
      <li>
        <a sveltekit:reload sveltekit:prefetch href="/journal/">journal</a>
      </li>
      <li style="display: none">
        <a sveltekit:reload sveltekit:prefetch href="/blog/">blog</a>
      </li>
      <li style="display: none">
        <a sveltekit:reload sveltekit:prefetch href="/travel/">travel log</a>
      </li>
      <li style="display: none">
        <a sveltekit:reload sveltekit:prefetch href="/lists/">shrines</a>
      </li>
      <li>
        <a sveltekit:reload sveltekit:prefetch href="/lists/">lists</a>
      </li>
    </ul>
  </nav>

  <aside>
    <span class="font-title">{$page.data.title || 'Home'}</span>
  </aside>

  <main>
    <slot />
  </main>

  <footer class="center" />
</div>

<style lang="scss">
  @import 'src/styles/grid/grid-main.scss';

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
