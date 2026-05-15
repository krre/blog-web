import * as api from '$lib/api';
import type { PageServerLoad } from './$types';

interface User {
	username: string;
	first_name: string;
	last_name: string;
}

export const load: PageServerLoad = async ({ locals }) => {
	let user: User = await api.get(`users/${locals.user?.id}`);
	return { user };
};
