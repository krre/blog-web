import * as api from '$lib/api';
import type { PageServerLoad } from './$types';

interface User {
	first_name: string;
	last_name: string;
	email: string;
	location: string;
	bio: string;
}

export const load: PageServerLoad = async () => {
	let user: User = await api.get('users/1');
	return { user };
};
