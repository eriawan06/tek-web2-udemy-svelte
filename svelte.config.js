import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		vite: {
			ssr: {
				noExternal: ['@popperjs/core']
			}
		},
	},
};

export default config;
