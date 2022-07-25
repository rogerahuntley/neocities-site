// these change based on endpoint, rest should be good
import { publicizeGroup } from '$posts';

// returns list of posts as filtered
export const get = async ({ params }) => {
  // this could be journals, articles, whatever has as associated type
  const postsFolder = params.posts;

  const _posts = await publicizeGroup( postsFolder );

  if(!_posts) {
    return {
      status: 404
    } 
  }
  
  return {
    body: _posts
  };
};