import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

interface Picture {}

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.user) return error(401);

	const pictures: Picture[] = [];
	return { pictures };
};
