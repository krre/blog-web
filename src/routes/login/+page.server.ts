import * as api from '$lib/api';
import { i18n } from '$lib/i18n.svelte.js';
import { isHttpError, type HttpError } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

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

		const user: User = {
			username: data.get('username')?.toString(),
			password: data.get('password')?.toString()
		};

		try {
			const jwt: JWT = await api.post('auth/login', user);

			cookies.set('jwt', jwt.token, {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: true,
				maxAge: 60 * 60 * 24 * 365 // 1 year
			});

			redirect(303, '/');
		} catch (e) {
			if (isHttpError(e)) {
				const error = e as HttpError;
				console.log(error);

				if (error.status == 401) {
					return fail(error.status, { error: i18n.t('login.wrongLoginOrPassword') });
				}
			}

			throw e;
		}
	}
};
