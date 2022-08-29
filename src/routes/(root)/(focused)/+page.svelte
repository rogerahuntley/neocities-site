<script lang="ts">
  import { PostLink } from '$lib/posts';
  import Bubble from '$lib/item/Bubble.svelte';

  export let data;
  const { journals, neocities } = data;
</script>

<div id="index">
  <h3 class="text-center">
    Welcome to <a href="/" id="logo">stealdog.<wbr />neocities.org</a>
  </h3>
  <div id="description">
    <p>Hello! Welcome to my website! 😉</p>

    <p>
      I'm currently in the process of undergoing repairs, so not all content is available. Any
      content available is subject to change.
    </p>

    <p>
      For right now, you can find <a href="/journal/">journals here</a>, and some assorted
      <a href="/lists/">lists here</a>.
    </p>
  </div>
  <div id="bubbles">
    <Bubble>
      <span slot="header">Latest Journal</span>
      <span slot="body">
        <PostLink post={journals.at(-1)} hideTag={true} />
      </span>
    </Bubble>
    <Bubble>
      <span slot="header">Visitor Count</span>
      <span slot="body">
        {neocities.info.views}
      </span>
    </Bubble>
    <Bubble>
      <span slot="header">Latest Experiment</span>
      <span slot="body">
        <a href="https://azlef900.neocities.org/"><pre>azlef900</pre></a>
      </span>
    </Bubble>
  </div>

  <div id="feedback">
    <span
      >Have feedback? Reach out to me <a href="https://neocities.org/site/stealdog">here</a>.</span
    >
  </div>
</div>

<style lang="scss">
  #index {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .text-center {
    width: 100%;
    text-align: center;
  }

  #logo {
    @extend .font-accent;
    font-size: 1.2em;
  }

  #bubbles {
    @include media('>=tablet') {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      gap: 0.2rem;
    }
  }

  #feedback {
    display: flex;
    justify-content: center;
  }
</style>
