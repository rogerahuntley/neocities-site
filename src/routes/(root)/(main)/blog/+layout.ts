import { mapBlogs } from '$lib/posts';
export const load = async () => {
  // get blog data
  const articles = await mapBlogs();

  return {
    articles,
    title: 'Blogs',
    titleLink: '/blog/',
  };
};