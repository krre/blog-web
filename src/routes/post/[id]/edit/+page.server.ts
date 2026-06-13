import * as api from '$lib/api';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

namespace Request {
	export interface Post {
		title?: string;
		post?: string;
	}
}

namespace Response {
	export interface Post {
		id: number;
		title: string;
		post: string;
		published_at?: Date;
	}
}

export const load: PageServerLoad = async ({ params, locals, url }) => {
	if (!locals.user) return error(401);

	const draft = url.searchParams.get('draft');
	const endpoint = draft ? 'drafts' : 'posts';
	let post: Response.Post = await api.get(`${endpoint}/${params.id}`);
	return { post };
};

export const actions = {
	edit: async ({ locals, params, request, url }) => {
		if (!locals.user) error(401);

		const data = await request.formData();

		const post: Request.Post = {
			title: data.get('title')?.toString(),
			post: data.get('post')?.toString()
		};

		await api.put(`posts/${params.id}`, post);
		return { success: true };
	}
};
