import * as api from '$lib/api';
import { i18n } from '$lib/i18n.svelte';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

interface Profile {
	username?: string;
	first_name?: string;
	last_name?: string;
}

export const load: PageServerLoad = async () => {
	let profile: Profile = await api.get('profile');
	return { profile };
};

export const actions = {
	update: async ({ request }) => {
		const data = await request.formData();

		const profile: Profile = {
			first_name: data.get('first_name')?.toString(),
			last_name: data.get('last_name')?.toString()
		};

		await api.post('profile', profile);
		return { profileSuccess: i18n.t('profile.profileUpdated') };
	},

	changePassword: async ({ request }) => {
		const data = await request.formData();
		const password = data.get('password')?.toString();
		const confirm_password = data.get('confirm_password')?.toString();

		if (password != confirm_password) {
			return fail(400, { passwordError: i18n.t('profile.differentPasswords') });
		}

		return { passwordSuccess: i18n.t('profile.passwordUpdated') };
	}
};
