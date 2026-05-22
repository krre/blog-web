import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

interface Post {
	title?: string;
	post?: string;
}

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) return error(401);
};
