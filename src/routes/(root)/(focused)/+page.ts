import { getPostsByFilter } from '$lib/posts';

export const load = async ({ fetch }) => {
  const allJournals = await getPostsByFilter({ type: 'journal' });
  const allUpdates = await getPostsByFilter({ type: 'project' });
  const sitedata = await fetch('/api/neocities.json');
  const sitedataJson = await sitedata.json();

  return {
    journal: allJournals.at(-1),
    update: allUpdates.at(-1),
    neocities: sitedataJson
  };
};