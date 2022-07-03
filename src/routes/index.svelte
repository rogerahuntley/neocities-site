<script context="module">
  export const load = async ({ fetch }) => {
    const journals = await fetch('/api/journals.json');
    const allJournals = await journals.json();

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
  import { JournalLink } from '$lib/journals';

  export let journals;
  export let data;
</script>

<h3 class="line text-center">
  ~ <pre>Welcome to my Home Page</pre>
  ~
</h3>
<div class="line">
  latest journal:
  <JournalLink hideTag={true} journal={journals.at(-1)} />
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

<style lang="scss">
  .line {
    margin-block: 0.5em; // prerendering mades <p> act weird, matched style but made it a div
    display: flex;
    gap: 1rem;
  }

  .text-center {
    text-align: center;
  }
</style>
