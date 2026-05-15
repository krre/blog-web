import * as api from '$lib/api';
import type { PageServerLoad } from './$types';

interface User {
	username?: string;
	first_name?: string;
	last_name?: string;
}

export const load: PageServerLoad = async ({ locals }) => {
	let user: User = await api.get(`users/${locals.user?.id}`);
	return { user };
};

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();

		const user: User = {
			first_name: data.get('first_name')?.toString(),
			last_name: data.get('last_name')?.toString()
		};

		await api.post(`users/${locals.user?.id}`, user);
		console.log({ user });
	}
};
