import { UPLOAD_DIR } from '$app/env/private';
import fs from 'fs';
import path from 'path';

export const GET = ({ params }) => {
	const filePath = path.join(UPLOAD_DIR, params.filename);
	const fileBuffer = fs.readFileSync(filePath);

	return new Response(fileBuffer, {
		headers: {
			'Content-Type': 'image/webp'
		}
	});
};
