import adapter from '@sveltejs/adapter-node';

const config = {
	kit: {
		experimental: {
			explicitEnvironmentVariables: true
		},
		adapter: adapter()
	}
};

export default config;
