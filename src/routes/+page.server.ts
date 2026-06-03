import * as api from '$lib/api';
import { type Post } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const posts: Post[] = await api.get('posts');
	return { posts };
};
