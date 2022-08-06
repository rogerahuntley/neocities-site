import { writable } from "svelte/store";
import type { post, post_endpoint } from '$types/post.type';
import { toMonthInt } from "$lib/posts";

// get all files
const _postFiles = import.meta.glob('$posts/**/*.svx');

// gathers array of all posts in $posts
const getAllPosts = async (showHidden = false) => {
  const _posts = await Promise.all(
    Object.entries(_postFiles).filter(async ([path, resolver]) => {
      const post = await resolver();
      // remove if hidden
      if(post.metadata.hidden && !showHidden) return false;
      return true;
    }).map(async ([filePath, resolver]) => {
      const post = await resolver();

      // get url for front-end routing
      var publicPath = filePath.replace('../posts', '').replace('.svx', '');

      const postsFolder = filePath.split('/')[2];
      const group = getGroupByName(postsFolder);
      
      // if group is known, adjust url
      if(group){
        publicPath = publicPath.replace(group.postsFolder, group.routesFolder);
      }

      // if group has custom route, replace with that instead
      if(group.customRoute){
        publicPath = group.customRoute(publicPath, post);
      }

      // else
      return {
        filePath,
        publicPath,
        data: post
      }
    })
  )
  
  return _posts.sort((a, b) => {
    return Date.parse(a.data.metadata.date) - Date.parse(b.data.metadata.date);
  })
};

var allPosts = getAllPosts();

// get posts by filter ("global", filters from all posts)
const getPostsByFilter = async (filter: post['data']['metadata'] = {}) => {
  const _posts = await allPosts;
  return filterPosts(_posts, filter);
}

// filter posts (filters from passed in array subset)
const filterPosts = (posts, filter) => {
  // see if one of the common groups and get postsFolder
  const postsFolder = getGroupByFilter(filter)?.postsFolder;

  // check if type and add
  const _posts = posts.map(_post => {
    let matchesFilter = true;
    let data = _post.data.metadata;

    // check if hidden
    if(data.hidden){
      return;
    }

    // loop through filter
    Object.entries(filter).forEach(entry => {

      const [key, value] = entry as [string, string];

      if(value == undefined){
        return;
      }

      let isGood = true;

      const date = data.date ? new Date(data.date) : new Date(0);

      switch (key){
        case 'type':
          isGood = data.type?.split(' ').includes(filter.type)
              || (postsFolder && _post.filePath.split('/').includes(postsFolder));
          break;
        case 'year':
          isGood = date.getUTCFullYear() == parseInt(value);
          break;
        case 'month':
          isGood = date.getUTCMonth() + 1 == toMonthInt(value);
          break;
        case 'day':
          isGood = date.getUTCDate() == parseInt(value);
          break;
        case 'tag':
          isGood = data.tags?.split(' ').includes(value);
          break;
        default:
          isGood = _post.data.metadata[key] == value;
      }
      matchesFilter = matchesFilter && isGood;
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

const journalPublicPath = (_publicPath, data) => {
  const date = new Date(data.metadata.date);
  return `/journal/${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}`;
}

const groups = {
  'journals' : {
    type: 'journal',
    postsFolder: 'journals',
    routesFolder: 'journal',
    posts: [],
    customRoute: journalPublicPath,
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
  // return all
  if(name == 'all'){
    return getPostsByFilter();
  }

  const group = getGroupByName(name);
  if(!group) return;

  const _posts: post_endpoint[] = (await getPostsByFilter({ type: group.type }) as post[]).map(journal => {
    return {
      path: journal.publicPath,
      metadata: journal.data.metadata as post_endpoint["metadata"]
    }})
  return _posts;
}
// set up store
const postStore = writable(allPosts);

postStore.subscribe(value => {
  allPosts = value;
})

export { postStore, publicizeGroup, filterPosts, getPostsByFilter }