import { getPostsByFilter } from '$lib/posts';
export const load = async () => {
  // get journal data
  const journals = await getPostsByFilter({ type: 'journal' });

  return {
    journals,
    title: 'Journals'
  };
};