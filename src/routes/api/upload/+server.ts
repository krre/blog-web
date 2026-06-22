import { error, json } from '@sveltejs/kit';
import { UPLOAD_DIR } from '$app/env/private';
import type { RequestHandler } from './$types';
import { writeFile, rm, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';

export const POST: RequestHandler = async ({ request }) => {
	const uploadDir = UPLOAD_DIR;

	if (!uploadDir) {
		return json({ success: true });
	}

	await mkdir(uploadDir, {
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

export const DELETE: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const filename = join(UPLOAD_DIR, formData.get('filename')?.toString() ?? '');

	if (!filename) {
		return json({ success: false });
	}

	await rm(filename);
	return json({ success: true });
};
