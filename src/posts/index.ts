const _postFiles = import.meta.glob('$posts/**/*.svx');
import type { post, post_endpoint } from '$types/post.type';

// gathers array of all posts in $posts
export const getAllPosts = async (showHidden = false) => {
  return await Promise.all(
    Object.entries(_postFiles).filter(async ([path, resolver]) => {
      const post = await resolver();
      // remove if hidden
      if(post.metadata.hidden && !showHidden) return false;
      return true;
    }).map(async ([path, resolver]) => {
      const post = await resolver();
      // else
      return {
        path,
        post
      }
    })
  )
};

export const allPosts = getAllPosts();

// filter posts by type
const filterByType = async (type: string) => {
  const group = getGroup({ type });
  if(!group) return;
  // check if type and add
  const _posts = (await allPosts).map(_post => {
    const isType = _post.post.metadata.type?.split(' ').includes(type) || _post.path.split('/').includes(group.postsFolder);
    if(isType) return _post
  })
  // filter out undefined
  return _posts.filter(i => i) as post[];
};

// get post by its local path
export const getPost = async function(path: string){
  return await _postFiles[path]();
}

// transform array of posts for an endpoint
export const publicizePosts = async (params = {}) => {
  const group = getGroup(params);
  if(!group) return;

  const _posts: post_endpoint[] = (await filterByType(group.type) as post[]).map(journal => {
    return {
      path: journal.path.replace('.', '').replace('.svx', '').replace(group.postsFolder, group.routesFolder),
      metadata: journal.post.metadata as post_endpoint["metadata"]
    }})
  return _posts;
}

const groups = [
  {
    type: 'journal',
    postsFolder: 'journals',
    routesFolder: 'journal'
  },
  {
    type: 'article',
    postsFolder: 'articles',
    routesFolder: 'blog'
  },
]

// get group by property
export const getGroup = (filter = {}) => {
  return groups.find(group => {
    let looksGood = true;

    // return if all filter params match
    Object.keys(filter).map(key => {
      looksGood = looksGood && (group[key] == filter[key]);
    })

    return looksGood;
  })
}