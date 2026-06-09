import * as api from '$lib/api';
import * as consts from '$lib/consts';
import { type Posts } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.user) return error(401);

	const page = Number(url.searchParams.get('page')) || 1;
	const limit = consts.Post.PageLimit;

	const params = {
		limit,
		offset: (page - 1) * limit
	};

	const posts: Posts = await api.get('drafts', params);
	return { posts };
};
