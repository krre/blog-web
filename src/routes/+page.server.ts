import * as api from '$lib/api';
import type { PageServerLoad } from './$types';

interface Post {
	id: number;
	title: string;
	created_at: Date;
	is_published: boolean;
}

export const load: PageServerLoad = async () => {
	const posts: Post[] = await api.get('posts');
	return { posts };
};
