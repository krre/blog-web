import * as api from '$lib/api';
import type { PageServerLoad } from './$types';

interface Draft {
	id: number;
	title: string;
	created_at: Date;
}

export const load: PageServerLoad = async () => {
	const posts: Draft[] = await api.get('drafts');
	return { posts };
};
