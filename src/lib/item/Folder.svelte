<script lang="ts">
  import { browser } from '$app/env';

  type attribute = {
    url: string;
    name: string;
  };

  export let attributes: attribute[] = [];
  export let name;

  let hidden = true;

  const toggle = () => {
    hidden = !hidden;
  };
</script>

<div class="folder">
  <button class="folder-name" class:browser class:hidden on:click={toggle}>
    {name}
    <span class="material-icons">{hidden ? 'book' : 'menu_book'}</span>
  </button>
  <aside class:browser class:hidden class="folder-body">
    <blockquote class="folder-attributes">
      <ul>
        {#each attributes as attr}
          <li>
            <a class="folder-attribute" href={attr.url}>{attr.name}</a>
          </li>
        {/each}
      </ul>
      <slot />
    </blockquote>
  </aside>
</div>

<style lang="scss">
  $folder-color: $accent-color;

  .folder {
    margin-block: 0.2em;
  }

  .folder-body {
    margin-top: -1px;
  }

  .folder-attributes ul {
    display: flex;
    flex-direction: row;
    gap: 0.5em;
  }

  .folder-name {
    background-color: $folder-color;
    padding: 0.2em 0.5em;
    border-radius: $less-rounded $less-rounded 0 0;
    display: flex;
    align-items: center;
    gap: 0.2em;

    .material-icons {
      font-size: 1em;
    }

    &.hidden {
      border-radius: $less-rounded;
    }

    &:not(.browser) {
      border-radius: $less-rounded $less-rounded 0 0;
    }
  }

  aside {
    &.hidden {
      &:not(.browser) {
        //display: some;
      }

      &.browser {
        display: none;
      }
    }
  }

  blockquote {
    margin: 0;
    padding: 1em;
    border-radius: 0 $less-rounded $less-rounded $less-rounded;
    background-color: $folder-color;
  }
</style>
