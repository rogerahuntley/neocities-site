<div id="grid-main">
  <header>
    roger
  </header>

  <nav>
    <ul>
      <li>
        <a href="/">home</a>
      </li>
      <li>
        <a href="/posts">journal</a>
      </li>
    </ul>
  </nav>

  <aside>
    boop!
  </aside>

  <main>
    <slot />
  </main>

  <footer>
    huntley
  </footer>
</div>

<style lang="scss">
  @import 'src/styles/grid-main.scss';
  :global(body) {
    background: url("/images/train.jpg");
    background-position: center;
    background-size: cover;
  }
</style>