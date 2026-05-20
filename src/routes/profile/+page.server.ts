import * as api from '$lib/api';
import { i18n } from '$lib/i18n.svelte';
import { saveJwt } from '$lib/utils';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

interface Profile {
	username?: string;
	first_name?: string;
	last_name?: string;
	email?: string;
	location?: string;
	bio?: string;
}

interface Password {
	password: string;
}

interface JWT {
	token: string;
}

export const load: PageServerLoad = async () => {
	let profile: Profile = await api.get('profile');
	return { profile };
};

export const actions = {
	update: async ({ request, cookies }) => {
		const data = await request.formData();

		const profile: Profile = {
			first_name: data.get('first_name')?.toString(),
			last_name: data.get('last_name')?.toString(),
			email: data.get('email')?.toString(),
			location: data.get('location')?.toString(),
			bio: data.get('bio')?.toString()
		};

		const jwt: JWT = await api.post('profile', profile);
		saveJwt(cookies, jwt.token);
		return { profileSuccess: i18n.t('profile.profileUpdated') };
	},

	changePassword: async ({ request, cookies }) => {
		const data = await request.formData();
		const password = data.get('password')?.toString();
		const confirm_password = data.get('confirm_password')?.toString();

		if (password != confirm_password) {
			return fail(400, { passwordError: i18n.t('profile.differentPasswords') });
		}

		const params: Password = {
			password: password!
		};

		const jwt: JWT = await api.patch('profile/password', params);
		saveJwt(cookies, jwt.token);

		return { passwordSuccess: i18n.t('profile.passwordUpdated') };
	}
};
