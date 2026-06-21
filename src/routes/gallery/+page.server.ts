import { uploadsDir } from '$lib/server-utils';
import * as consts from '$lib/consts';
import { error } from '@sveltejs/kit';
import { readdir, stat } from 'node:fs/promises';
import type { PageServerLoad } from './$types';
import { join } from 'node:path';

interface Images {
	files: string[];
	total: number;
}

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.user) return error(401);

	const dirPath = uploadsDir();
	const files = await readdir(dirPath);

	const filesWithStats = await Promise.all(
		files.map(async (file) => {
			const filePath = join(dirPath, file);
			const fileStat = await stat(filePath);

			return {
				name: file,
				mtime: fileStat.mtime.getTime()
			};
		})
	);

	const sortedFiles = filesWithStats.sort((a, b) => b.mtime - a.mtime).map((file) => file.name);

	const page = Number(url.searchParams.get('page')) || 1;
	const limit = consts.Gallery.PageLimit;
	const offset = (page - 1) * limit;

	const images: Images = {
		files: sortedFiles.slice(offset, offset + limit),
		total: sortedFiles.length
	};

	return images;
};
