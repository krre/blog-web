import * as api from '$lib/api';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

interface Post {
	id: number;
	title: string;
	post: string;
	is_published: boolean;
	created_at: Date;
}

export const load: PageServerLoad = async ({ params }) => {
	let post: Post = await api.get(`posts/${params.id}`);
	return { post };
};

export const actions = {
	delete: async ({ locals, params }) => {
		if (!locals.user) error(401);

		await api.del(`posts/${params.id}`);
		redirect(307, '/');
	}
};
