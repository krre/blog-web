import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

interface Image {}

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) return error(401);

	const images: Image[] = [];
	return { images };
};
