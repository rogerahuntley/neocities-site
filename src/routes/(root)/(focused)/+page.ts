import { getPostsByFilter } from '$lib/posts';

export const load = async ({ fetch }) => {
  const allJournals = await getPostsByFilter({ type: 'journal' });
  //çconst sitedata = await fetch('https://neocities.org/api/info?sitename=stealdog');
  //const sitedataJson = await sitedata.json();

  return {
    journals: allJournals,
    neocities: 4//sitedataJson
  };
};