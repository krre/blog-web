import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ cookies, locals }) => {
	cookies.delete('jwt', { path: '/' });
	locals.user = undefined;
	redirect(303, '/');
};
