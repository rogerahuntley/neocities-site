<script context="module">
  import { getPostsOfType } from '$stores/post.store';

  export const load = async ({ fetch }) => {
    const allJournals = await getPostsOfType('journal');
    const data = await fetch('api/neocities.json');
    const jsonData = await data.json();

    return {
      props: {
        journals: allJournals,
        data: jsonData
      }
    };
  };
</script>

<script>
  import { PostLink } from '$lib/posts';

  export let journals;
  export let data;
</script>

<h3 class="line text-center">
  ~ <pre>Welcome to my Home Page</pre>
  ~
</h3>
<div class="line">
  latest journal:
  <PostLink hideTag={true} post={journals.at(-1)} />
</div>
<p>Visitor count (at last compile): {data.info.views}</p>
<div class="line">
  Check the changelog here: <a href="/journal/meta"><pre>Sort Journals by <code>meta</code></pre></a
  >
</div>
<div class="line">
  New experiment here: <a href="https://azlef900.neocities.org/"
    ><pre>azlef900: a trip report simulator</pre></a
  >
</div>
<p>
  Soon I'll write up a doc on using <code>emoji</code> as punctuation, but for now, here goes:
  <strong>Emoji can replace periods.</strong>
  Full stop 🤯, but not commas. It just looks weird to end a line like this 😅.
</p>
<p>
  Have feedback? Reach out to me <a href="https://neocities.org/site/stealdog">here</a>.
</p>

<style lang="scss">
  .line {
    margin-block: 0.5em; // prerendering mades <p> act weird, matched style but made it a div
    display: flex;
    gap: 1rem;

    @include media('<desktop') {
      justify-content: space-between;
      align-items: center;

      :global(a) {
        flex-shrink: 2;
        text-align: right;
      }
    }
  }

  .text-center {
    text-align: center;
  }
</style>
