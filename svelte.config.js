import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
    scss: {
      prependData: `
        @import './src/styles/variables.scss';
        @import 'include-media/dist/_include-media.scss';`
    }
  }),

	kit: {
		adapter: adapter(),
		prerender: {
			default: true
		}
	}
};

export default config;
