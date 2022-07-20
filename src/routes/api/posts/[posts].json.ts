// these change based on endpoint, rest should be good
import { publicizePosts } from '$posts';

// returns list of posts as filtered
export const get = async ({ params }) => {
  const postsFolder = params.posts;

  const _posts = await publicizePosts({ postsFolder });

  if(!_posts) {
    return {
      status: 404
    } 
  }
  
  return {
    body: _posts
  };
};