import * as api from '$lib/api';
import * as consts from '$lib/consts';
import { type Post } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const page = Number(url.searchParams.get('page')) || 1;
	let params = null;

	if (page > 1) {
		const limit = consts.Main.PageLimit;

		params = {
			limit,
			offset: (page - 1) * limit
		};
	}

	const posts: Post[] = await api.get('posts', params);
	return { posts };
};
