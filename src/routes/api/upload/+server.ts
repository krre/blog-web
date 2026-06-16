import { uploadsDir } from '$lib/utils';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';

export const POST: RequestHandler = async ({ request }) => {
	await mkdir(uploadsDir(), {
		recursive: true
	});

	const formData = await request.formData();
	const files = formData.getAll('images');

	for (const file of files) {
		if (!(file instanceof File)) continue;

		if (!file.type.startsWith('image/')) {
			throw error(400, 'Invalid file type');
		}

		const buffer = Buffer.from(await file.arrayBuffer());

		const webpBuffer = await sharp(buffer)
			.resize({
				width: 1600,
				withoutEnlargement: true
			})
			.webp({
				quality: 80
			})
			.toBuffer();

		await writeFile(join(uploadDir, `${randomUUID()}.webp`), webpBuffer);
	}

	return json({ success: true });
};
