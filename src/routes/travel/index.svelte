<script context="module">
  export const load = async ({ fetch }) => {
    const journals = await fetch('/api/journals.json');
    const allJournals = await journals.json();

    return {
      props: {
        journals: allJournals
      }
    };
  };
</script>

<script>
  import { Iceland, LA } from '$lib/travel';
  export let journals;
</script>

<Iceland {journals} />
<LA {journals} />
