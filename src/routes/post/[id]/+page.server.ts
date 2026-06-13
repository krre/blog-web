import * as api from '$lib/api';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

interface Post {
	id: number;
	title: string;
	post: string;
	created_at: Date;
	updated_at: Date;
	published_at?: Date;
}

export const load: PageServerLoad = async ({ params, url }) => {
	const draft = url.searchParams.get('draft');
	const endpoint = draft ? 'drafts' : 'posts';

	let post: Post = await api.get(`${endpoint}/${params.id}`);
	return { post };
};

export const actions = {
	publish: async ({ locals, params }) => {
		if (!locals.user) error(401);

		await api.patch(`posts/${params.id}/publish`);
		redirect(307, '/');
	},

	hide: async ({ locals, params }) => {
		if (!locals.user) error(401);

		await api.patch(`posts/${params.id}/hide`);
		redirect(307, '/');
	},

	delete: async ({ locals, params }) => {
		if (!locals.user) error(401);

		await api.del(`posts/${params.id}`);
		redirect(307, '/');
	}
};
