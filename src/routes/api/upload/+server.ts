import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

export const POST: RequestHandler = async ({ request }) => {
	const uploadDir = join('static', 'uploads');

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

		console.log({ file });

		const buffer = Buffer.from(await file.arrayBuffer());
		await writeFile(join(uploadDir, file.name), buffer);
	}

	return json({ success: true });
};
