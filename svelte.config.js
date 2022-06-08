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
    }),
    mdsvex({
      extensions: ['.md', '.svx'],
      layout: {
        journal: 'src/routes/journal/_journal.svelte',
        lexicon: 'src/lib/lexicon/_lexicon.svelte',
        list: 'src/lib/list/_list.svelte'
      }
    })
  ],
  
  extensions: ['.svelte', '.md', '.svx'],

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
          '$journals': resolve('./src/routes/journal'),
        }
      }
    },
    trailingSlash: 'always'
  }
};

export default config;
