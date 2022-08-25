import { getPostsByFilter } from '$lib/posts';
export const load = async () => {
  return {
    iceland: await getPostsByFilter({ travel: 'Iceland' }),
    la: await getPostsByFilter({ travel: 'Los Angeles' }),
    title: 'Travel'
  };
};