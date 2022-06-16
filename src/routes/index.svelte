<script context="module">
  import { title } from '$stores/title.store';
  title.set('Home');

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
  title.set('Home');
  import { JournalLink } from '$lib/journals/index';

  export let journals;
  export let data;
</script>

<p>welcome to my home page</p>
<p>latest journal: <JournalLink journal={journals.at(-1)} /></p>
<p>Visitor count (at last compile): {data.info.views}</p>
<p>New! Check out my <a href="/lists/">lists</a>!</p>
<p>
  Now with <a href="https://github.com/marketplace/actions/deploy-to-neocities">GitHub Actions</a> 😉
</p>
<p>
  Soon I'll write up a doc on using emoji's as punctuation, but for now, here goes:
  <br />
  <strong>Emoji's can replace periods.</strong>
  <br />
  Full stop 🤯, but not commas. It just looks weird to end a line like this 😅.
</p>
<p>
  Also: this site is fully accessible without JavaScript! I might add some CSS transitions for some
  of the elements.
</p>
