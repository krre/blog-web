import { defineEnvVars } from '@sveltejs/kit/hooks';

export const variables = defineEnvVars({
	API_SERVER_URL: {},
	UPLOAD_DIR: {},
	GOOGLE_ANALYTICS_ID: {
		public: true
	}
});
