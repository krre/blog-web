import * as api from '$lib/api';
import { type Post } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) return error(401);

	const posts: Post[] = await api.get('drafts');
	return { posts };
};
