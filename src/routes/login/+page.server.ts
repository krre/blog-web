import * as api from '$lib/api';
import { i18n } from '$lib/i18n.svelte.js';
import { isHttpError, type HttpError } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { saveJwt } from '$lib/utils.js';

interface User {
	username?: string;
	password?: string;
}

interface JWT {
	token: string;
}

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) redirect(307, '/');
};

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = data.get('username')?.toString();

		const user: User = {
			username,
			password: data.get('password')?.toString()
		};

		try {
			const jwt: JWT = await api.post('auth/login', user);
			saveJwt(cookies, jwt.token);
			redirect(303, '/');
		} catch (e) {
			if (isHttpError(e)) {
				const error = e as HttpError;

				if (error.status == 401) {
					return fail(error.status, { error: i18n.t('login.wrongLoginOrPassword'), username });
				}
			}

			throw e;
		}
	}
};
