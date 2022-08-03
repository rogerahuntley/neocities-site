import { writable } from "svelte/store";
import type { post, post_endpoint } from '$types/post.type';

// get all files
const _postFiles = import.meta.glob('$posts/**/*.svx');

// gathers array of all posts in $posts
const getAllPosts = async (showHidden = false) => {
  return await Promise.all(
    Object.entries(_postFiles).filter(async ([path, resolver]) => {
      const post = await resolver();
      // remove if hidden
      if(post.metadata.hidden && !showHidden) return false;
      return true;
    }).map(async ([filePath, resolver]) => {
      const post = await resolver();

      // get url for front-end routing
      var publicPath = filePath.replace('../posts', '').replace('.svx', '');

      // if group is known, adjust url
      const postsFolder = publicPath.split('/')[1];
      const group = getGroupByName(postsFolder);
      if(group){
        publicPath = publicPath.replace(group.postsFolder, group.routesFolder);
      }


      console.log(filePath, publicPath)
      // else
      return {
        filePath,
        publicPath,
        data: post
      }
    })
  )
};

var allPosts = getAllPosts();

// get posts by type
const getPostsOfType = async (type: string) => {
  return getPostsByFilter({ type });
};

// get posts by filter
const getPostsByFilter = async (filter: post['data']['metadata'] = {}) => {
  // see if one of the common groups and get postsFolder
  const postsFolder = getGroupByFilter(filter)?.postsFolder;

  // check if type and add
  const _posts = (await allPosts).map(_post => {
    let matchesFilter = true;

    // loop through filter
    Object.entries(filter).forEach(entry => {
      const [key, value] = entry;
      switch (key){
        case 'type':
          let isType = filter.type
            ? _post.data.metadata.type?.split(' ').includes(filter.type)
              || (postsFolder && _post.filePath.split('/').includes(postsFolder))
            : true;
          
          matchesFilter = matchesFilter && isType;
        break;
        default:
          matchesFilter = matchesFilter && _post.data.metadata[key] == value;
      }
    });

    if(matchesFilter) return _post;
  });

  // filter out undefined
  return _posts.filter(i => i) as post[];
}

// get group by filter
const getGroupByFilter = (filter = {}) => {
  // otherwise, further filter by data
  return Object.values(groups).find(group => {
    let looksGood = true;

    // return if all filter params match
    Object.keys(filter).map(key => {
      looksGood = looksGood && ((group[key] == filter[key]) || !group[key]);
    })

    return looksGood;
  })
}

const groups = {
  'journals' : {
    type: 'journal',
    postsFolder: 'journals',
    routesFolder: 'journal',
    posts: [],
  },
  'articles' : {
    type: 'article',
    postsFolder: 'articles',
    routesFolder: 'blog',
    posts: [],
  },
}

// get group by name
const getGroupByName = (name: string) => {
  return groups[name] || {};
}

// transform array of posts for an endpoint
const publicizeGroup = async (name: string) => {
  const group = getGroupByName(name);
  if(!group) return;

  const _posts: post_endpoint[] = (await getPostsOfType(group.type) as post[]).map(journal => {
    return {
      path: journal.publicPath,
      metadata: journal.data.metadata as post_endpoint["metadata"]
    }})
  return _posts;
}

const postStore = writable(allPosts);

postStore.subscribe(value => {
  allPosts = value;
})

export { postStore, publicizeGroup, getPostsOfType, getPostsByFilter }