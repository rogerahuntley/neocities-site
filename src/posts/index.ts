const _postFiles = import.meta.glob('$posts/**/*.svx');
import type { post, post_endpoint } from '$types/post.type';

// gathers array of all posts in $posts
const getAllPosts = async (showHidden = false) => {
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
        data: post
      }
    })
  )
};

const allPosts = getAllPosts();

// filter posts by type
const getPostsOfType = async (type: string) => {
  const group = getGroupByFilter({ type });
  if(!group) return;
  // check if type and add
  const _posts = (await allPosts).map(_post => {
    const isType = _post.data.metadata.type?.split(' ').includes(type) || _post.path.split('/').includes(group.postsFolder);
    if(isType) return _post
  })
  // filter out undefined
  return _posts.filter(i => i) as post[];
};

// get group by type
const getGroupByName = (name: string) => {
  return groups[name] || {};
}

// get group by filter
const getGroupByFilter = (filter = {}) => {
  // otherwise, further filter by data
  return Object.values(groups).find(group => {
    let looksGood = true;

    // return if all filter params match
    Object.keys(filter).map(key => {
      looksGood = looksGood && (group[key] == filter[key]);
    })

    return looksGood;
  })
}

// transform array of posts for an endpoint
const publicizeGroup = async (params: string) => {
  const group = getGroupByName(params);
  if(!group) return;

  const _posts: post_endpoint[] = (await getPostsOfType(group.type) as post[]).map(journal => {
    return {
      path: journal.path.replace('.', '').replace('.svx', '').replace(group.postsFolder, group.routesFolder),
      metadata: journal.data.metadata as post_endpoint["metadata"]
    }})
  return _posts;
}

const groups = {
  'journals' : {
    type: 'journal',
    postsFolder: 'journals',
    routesFolder: 'journal'
  },
  'articles' : {
    type: 'article',
    postsFolder: 'articles',
    routesFolder: 'blog'
  },
}

export { publicizeGroup, getPostsOfType }