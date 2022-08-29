import { blogPublicPath, getPostsByFilter } from '$lib/posts';
import type { blog_map } from '$types/blog.type';

const getBlogs = async () => {
  return await getPostsByFilter({ type: 'article' });
}

const mapBlogs = async (posts?): Promise<{ [key: string]: blog_map }> => {
  posts = await posts || await getBlogs();
  const blogs = {} as { [key: string]: blog_map };
  posts.map((p) => {
    blogs[blogPublicPath('', p.data).replace('/blog/', '')] = p;
  })
  return blogs;
}

export { getBlogs, mapBlogs }