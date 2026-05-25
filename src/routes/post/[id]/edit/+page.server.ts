import * as api from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

interface Post {
	id: number;
	title: string;
	post: string;
	is_published: boolean;
}

interface UpdatedPost {
	title?: string;
	post?: string;
	is_published: boolean;
}

export const load: PageServerLoad = async ({ params }) => {
	let post: Post = await api.get(`posts/${params.id}`);
	return { post };
};

export const actions = {
	edit: async ({ locals, params, request }) => {
		if (!locals.user) error(401);

		const data = await request.formData();

		const post: UpdatedPost = {
			title: data.get('title')?.toString(),
			post: data.get('post')?.toString(),
			is_published: data.get('status')?.toString() == 'published'
		};

		await api.put(`posts/${params.id}`, post);
		return { success: true };
	}
};
