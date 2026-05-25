import * as api from '$lib/api';
import * as consts from '$lib/consts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

interface Post {
	title?: string;
	post?: string;
	is_published: boolean;
}

interface PostId {
	id: number;
}

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) return error(401);
};

export const actions = {
	append: async ({ request }) => {
		const data = await request.formData();

		const post: Post = {
			title: data.get('title')?.toString(),
			post: data.get('post')?.toString(),
			is_published: data.get('status')?.toString() == consts.PostState.Published
		};

		const postId: PostId = await api.post('posts', post);
		return { id: postId.id };
	}
};
