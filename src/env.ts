import { defineEnvVars } from '@sveltejs/kit/hooks';
import { building } from '$app/env';
import * as v from 'valibot';

export const variables = defineEnvVars({
	API_SERVER_URL: {
		static: true
	},
	UPLOAD_DIR: {
		static: false,
		schema: building ? v.optional(v.string()) : v.string()
	},
	GOOGLE_ANALYTICS_ID: {
		public: true,
		static: true
	}
});
