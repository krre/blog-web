import { redirect } from '@sveltejs/kit';

export function GET({ cookies, locals }) {
	cookies.delete('jwt', { path: '/' });
	locals.user = undefined;
	redirect(303, '/');
}
