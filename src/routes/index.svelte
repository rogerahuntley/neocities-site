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
  import { title } from '$stores/title.store';
  import { JournalLink } from '$lib/journals/index';
  title.set('Home');

  export let journals;
  export let data;
  console.log(data);
</script>

<p>welcome to my home page</p>
<p>latest journal: <JournalLink journal={journals.at(-1)} /></p>
<p>Visitor count (at last compile): {data.info.views}</p>
<p>New! Check out my <a href="/lists/">lists</a>!</p>
<p>
  Now with <a href="https://github.com/marketplace/actions/deploy-to-neocities">GitHub Actions</a> 😉
</p>
