import { getPostsByFilter } from '$lib/posts';

export const load = async ({ fetch }) => {
  const allJournals = await getPostsByFilter({ type: 'journal' });
  const sitedata = await fetch('/api/neocities.json');
  const sitedataJson = await sitedata.json();
  console.log(sitedataJson);

  return {
    journals: allJournals,
    neocities: sitedataJson
  };
};