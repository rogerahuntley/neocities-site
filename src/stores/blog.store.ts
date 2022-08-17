import { blogPublicPath, postStore, getPostsByFilter } from './post.store';
import { writable, get } from 'svelte/store';

// set up store
const blogStore = writable(get(postStore));

postStore.subscribe(async(posts) => {
  blogStore.set(posts);
})

export { blogStore };