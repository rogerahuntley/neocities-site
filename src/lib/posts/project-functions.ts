import { projectUpdatePublicPath, getPostsByFilter } from '$lib/posts';
import type { update_map } from '$types/project.type';

const getUpdates = async () => {
  return await getPostsByFilter({ type: 'project' });
}

const mapUpdates = async (posts?): Promise<{ [key: string]: update_map }> => {
  posts = await posts || await getUpdates();
  const updates = {} as { [key: string]: update_map };
  posts.map((p) => {
    updates[projectUpdatePublicPath('', p.data).replace('/blog/', '')] = p;
  })
  return updates;
}

export { getUpdates, mapUpdates }