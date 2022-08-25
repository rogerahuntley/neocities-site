import { mapBlog } from '$lib/posts';
export const load = async () => {
  // get blog data
  const articles = await mapBlog();

  return {
    articles,
    title: 'Blogs'
  };
};