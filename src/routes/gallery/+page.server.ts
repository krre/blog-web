import { uploadsDir } from '$lib/server-utils';
import * as consts from '$lib/consts';
import { error } from '@sveltejs/kit';
import { readdir } from 'node:fs/promises';
import type { PageServerLoad } from './$types';

interface Images {
	files: string[];
	total: number;
}

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.user) return error(401);

	const page = Number(url.searchParams.get('page')) || 1;
	const limit = consts.Post.PageLimit;

	const files = await readdir(uploadsDir());
	files.sort().reverse();
	const offset = (page - 1) * limit;

	const images: Images = {
		files: files.slice(offset, offset + limit),
		total: files.length
	};

	return images;
};
