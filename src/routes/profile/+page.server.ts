import * as api from '$lib/api';
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
	default: async ({ request }) => {
		const data = await request.formData();

		const profile: Profile = {
			first_name: data.get('first_name')?.toString(),
			last_name: data.get('last_name')?.toString()
		};

		await api.post('profile', profile);
		console.log({ profile });
	}
};
