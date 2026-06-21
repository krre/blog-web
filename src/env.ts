import { defineEnvVars } from '@sveltejs/kit/hooks';

export const variables = defineEnvVars({
	API_SERVER_URL: {},
	GOOGLE_ANALYTICS_ID: {
		public: true
	}
});
