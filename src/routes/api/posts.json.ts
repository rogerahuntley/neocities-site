
import { filter } from '$lib/posts';
import { toPublicPath } from '$lib/posts';
import type { post } from '@/types/post.type';

// ### ENDPOINTS ###

// returns list of posts as filtered
export const get = async ({ url }) => {
  const postFiles = import.meta.glob('@/posts/**/*.svx');

  // we should be able to send these params straight through the filter and return as normal
  const params = await Object.fromEntries(url.searchParams);

  const _posts: post[] = (await Promise.all(
    Object.entries(postFiles).map(async ([path, resolver]) => {
      const { metadata } = await resolver();

      if (metadata.hidden) {
        return undefined;
      }

      const _post: post = {
        metadata,
        path: toPublicPath(path),
      };

      return _post;
    }
  ))).filter(i => i) as post[];

  const filtered = filter(_posts, params);

  // sort by date
  if (filtered) {
    return {
      body: filtered.sort((a, b) => a.metadata.date.localeCompare(b.metadata.date))
    };
  }

  return {
    status: 404
  };
};
