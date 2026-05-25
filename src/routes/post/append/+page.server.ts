import * as api from '$lib/api';
import * as consts from '$lib/consts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

namespace Request {
	export interface Post {
		title?: string;
		post?: string;
		is_published: boolean;
	}
}

namespace Response {
	export interface Post {
		id: number;
	}
}

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) return error(401);
};

export const actions = {
	append: async ({ request }) => {
		const data = await request.formData();

		const reqPost: Request.Post = {
			title: data.get('title')?.toString(),
			post: data.get('post')?.toString(),
			is_published: data.get('status')?.toString() == consts.PostState.Published
		};

		const respPost: Response.Post = await api.post('posts', reqPost);
		return { id: respPost.id };
	}
};
