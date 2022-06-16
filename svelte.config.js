import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';
import { resolve } from 'path';
import { mdsvex } from 'mdsvex';
import autoprefixer from 'autoprefixer';
import postcsshfix from 'postcss-100vh-fix';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    mdsvex({
      extensions: ['.md', '.svx'],
      layout: {
        journal: 'src/routes/journal/_journal.svelte',
        lexicon: 'src/lib/lexicon/_lexicon.svelte',
        lists: 'src/lib/lists/_list.svelte'
      }
    }),
    sveltePreprocess({
      scss: {
        prependData: `
          @import './src/styles/variables.scss';
          @import 'include-media/dist/_include-media.scss';
        `
      }, 
      postcss: {
        plugins: [
          autoprefixer,
          postcsshfix
        ]
      },
    })
  ],
  
  extensions: ['.svelte', '.md', '.svx'],

  kit: {
    adapter: adapter({
      fallback: 'not_found.html'
    }),
    prerender: {
      default: true
    },
    vite: {
      resolve: {
        alias: {
          '@': resolve('./src'),
          '$stores': resolve('./src/stores'),
          '$types': resolve('./src/types'),
          '$journal': resolve('./src/routes/journal'),
        }
      }
    },
    trailingSlash: 'ignore',
    browser: {
      router: false
    }
  }
};

export default config;
