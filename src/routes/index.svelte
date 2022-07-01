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

<h3>~ Welcome to my Home Page ~</h3>
<div id="latest">
  latest journal:
  <JournalLink journal={journals.at(-1)} />
</div>
<p>Visitor count (at last compile): {data.info.views}</p>
<p>New! Check out my <a href="/lists/">lists</a>!</p>
<p>
  Now with <a href="/journal/2022/6/13">GitHub Actions</a> 😉
</p>
<p>
  Soon I'll write up a doc on using <code>emoji</code> as punctuation, but for now, here goes:
  <strong>Emoji can replace periods.</strong>
  Full stop 🤯, but not commas. It just looks weird to end a line like this 😅.
</p>

<style lang="scss">
  #latest {
    margin-block: 0.5em; // prerendering mades <p> act weird, matched style but made it a div

    display: flex;
    gap: 1rem;
  }
</style>
