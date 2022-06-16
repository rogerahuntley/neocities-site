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
  import { JournalLink } from '$lib/journals/index';

  export let journals;
  export let data;
</script>

<h3>welcome to my home page</h3>
<div id="latest">
  latest journal:
  <JournalLink journal={journals.at(-1)} />
</div>
<p>Visitor count (at last compile): {data.info.views}</p>
<p>New! Check out my <a href="/lists/">lists</a>!</p>
<p>
  Now with <a href="https://github.com/marketplace/actions/deploy-to-neocities">GitHub Actions</a> 😉
</p>
<p>
  Soon I'll write up a doc on using <code>emoji</code> as punctuation, but for now, here goes:
  <br />
  <strong>Emoji can replace periods.</strong>
  <br />
  Full stop 🤯, but not commas. It just looks weird to end a line like this 😅.
</p>
<p>
  Also: this site is fully accessible without JavaScript! I might have to add some CSS transitions
  for some of the elements because they *flash* on refresh (before the javascript loads).
</p>

<style lang="scss">
  #latest {
    margin-block: 0.5em; // prerendering mades <p> act weird, matched style but made it a div

    display: flex;
    gap: 1rem;
  }
</style>
