import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';
import { resolve } from 'path';
import { mdsvex } from 'mdsvex';
import autoprefixer from 'autoprefixer';

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
        plugins: [autoprefixer]
      },
    }),
    mdsvex({
      extensions: ['.md'],
      layout: {
        post: 'src/routes/post/_post.svelte'
      }
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
          '$posts': resolve('./src/routes/post'),
        }
      }
    },
    trailingSlash: 'always'
  }
};

export default config;
