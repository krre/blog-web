import type { PageServerLoad } from './$types';

interface Post {
	title?: string;
	post?: string;
}

export const load: PageServerLoad = async ({ locals }) => {};
