import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
    alias: {
      'atom': 'src/lib/components/atom',
      'molecule': 'src/lib/components/molecule',
      'organism': 'src/lib/components/organism',
      'template': 'src/lib/components/template',
      'interface': 'src/lib/interface',
      'service': 'src/lib/service',
      'store': 'src/lib/store',
    }
	}
};

export default config;
