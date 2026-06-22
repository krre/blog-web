import { defineEnvVars } from '@sveltejs/kit/hooks';

export const variables = defineEnvVars({
	API_SERVER_URL: {
		static: true
	},
	UPLOAD_DIR: {
		static: true
	},
	GOOGLE_ANALYTICS_ID: {
		public: true,
		static: true
	}
});
