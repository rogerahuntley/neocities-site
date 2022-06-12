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

hello neocities! ... and we back

<br /><br />

latest journal: <JournalLink journal={journals.at(-1)} />

<br />

Visitor count (at last compile): {data.info.views}