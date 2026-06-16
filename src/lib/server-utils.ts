import * as consts from '$lib/consts';
import { join } from 'node:path';

export function uploadsDir() {
	return join('static', consts.Gallery.UploadsDirName);
}
