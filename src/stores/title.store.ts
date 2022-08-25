import { writable } from 'svelte/store';

export const getTitle = (path) => {
  var _title = path.split('/').filter((i) => i)[0] || 'Home';
  _title = _title.charAt(0).toUpperCase() + _title.slice(1);
  title.set(_title);
  return _title;
};

export const title = writable('');