// these change based on endpoint, rest should be good
import { publicizeGroup } from '$lib/posts';

// returns list of posts as filtered
export const get = async () => {
  // this will return all posts
  const _posts = await publicizeGroup('all');

  if(!_posts) {
    return {
      status: 404
    } 
  }
  
  return {
    body: _posts
  };
};