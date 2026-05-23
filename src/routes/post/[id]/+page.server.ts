import * as api from '$lib/api';
import type { PageServerLoad } from './$types';

interface Post {
	title: string;
	post: string;
	is_published: boolean;
	created_at: Date;
}

export const load: PageServerLoad = async ({ params }) => {
	let post: Post = await api.get(`posts/${params.id}`);
	return { post };
};
