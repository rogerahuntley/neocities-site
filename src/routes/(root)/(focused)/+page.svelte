<script lang="ts">
  import { PostLink } from '$lib/posts';

  export let data;
  const { journals, neocities } = data;
</script>

<div id="index">
  <h3 class="text-center">
    Welcome to <a sveltekit:reload href="/" id="logo">stealdog.neocities.org</a>
  </h3>
  <div class="boxes">
    <div class="box">
      <div class="box-header">Latest journal</div>
      <div class="box-contents">
        <PostLink post={journals.at(-1)} hideTag={true} />
      </div>
    </div>
    <div class="box">
      <div class="box-header">Visitor count</div>
      <div class="box-contents">{300}</div>
    </div>
    <div class="box">
      <div class="box-header">Latest experiment</div>
      <div class="box-contents">
        <a sveltekit:reload href="https://azlef900.neocities.org/"><pre>azlef900</pre></a>
      </div>
    </div>
  </div>

  <div id="description">
    <p>Hello! Welcome to my website! 😉</p>

    <p>
      I'm currently in the process of undergoing repairs, so not all content is available. Any
      content available is subject to change.
    </p>

    <p>
      For right now, you can find <a sveltekit:reload href="/journal/">journals here</a>, and some
      assorted
      <a sveltekit:reload href="/lists/">lists here</a>.
    </p>
  </div>

  <div id="feedback">
    <span
      >Have feedback? Reach out to me <a sveltekit:reload href="https://neocities.org/site/stealdog"
        >here</a
      >.</span
    >
  </div>
</div>

<style lang="scss">
  #index {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .boxes {
    margin-block: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.2rem;
    text-align: center;

    .box {
      width: 10rem;
      flex-grow: 0;
      border-radius: $rounded;
      background-color: $accent-color;

      display: flex;
      flex-direction: column;
      align-items: center;

      .box-header {
        text-transform: capitalize;
        top: 0;
        border-bottom: 2px solid $accent-color-2;
        width: 100%;
        padding: 0.8rem;
      }

      .box-contents {
        width: 100%;
        height: 100%;
        display: grid;
        place-content: center;
        padding: 0.8rem;
      }
    }
  }

  .text-center {
    width: 100%;
    text-align: center;
  }

  #logo {
    @extend .font-accent;
    font-size: 1.2em;
  }

  #description {
    @include media('>=desktop') {
      width: 80%;
      margin: auto;
    }
  }

  #feedback {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-grow: 1;
  }
</style>
