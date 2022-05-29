import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';
import { resolve } from 'path';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    sveltePreprocess({
      scss: {
        prependData: `
          @import './src/styles/variables.scss';
          @import 'include-media/dist/_include-media.scss';
        `
      }
    }),
    mdsvex({
      extensions: ['.md']
    })
  ],
  
  extensions: ['.svelte', '.md'],

  kit: {
    adapter: adapter(),
    prerender: {
      default: true
    },
    vite: {
      resolve: {
        alias: {
          '@': resolve('./src'),
          '$stores': resolve('./src/stores'),
          '$types': resolve('./src/types'),
        }
      }
    }
  }
};

export default config;
