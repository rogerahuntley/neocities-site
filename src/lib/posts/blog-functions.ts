import { blogPublicPath, getPostsByFilter } from '$lib/posts';
import type { blogMap } from '$types/blog.type';

const getBlogs = async () => {
  return await getPostsByFilter({ type: 'article' });
}

const mapBlog = async (posts?): Promise<{ [key: string]: blogMap }> => {
  posts = await posts || await getBlogs();
  const blogs = {} as { [key: string]: blogMap };
  posts.map((p) => {
    blogs[blogPublicPath('', p.data).replace('/blog/', '')] = p;
  })
  return blogs;
}

export { mapBlog }