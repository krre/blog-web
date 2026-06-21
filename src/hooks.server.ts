import type { User } from '$lib/types';
import type { Handle } from '@sveltejs/kit';
import { jwtDecode } from 'jwt-decode';
import { GOOGLE_ANALYTICS_ID } from '$app/env/public';

interface JwtUser {
	id: number;
	first_name: string;
	last_name: string;
}

interface JwtPayload {
	user: JwtUser;
	exp: number;
}

export const handle: Handle = async ({ event, resolve }) => {
	const jwt = event.cookies.get('jwt');

	if (jwt) {
		const jwtUser = jwtDecode<JwtPayload>(jwt).user;

		const user: User = {
			id: jwtUser.id,
			fullName: jwtUser.first_name + (jwtUser.last_name ? ' ' + jwtUser.last_name : '')
		};

		event.locals.user = user;
	}

	return resolve(event, {
		transformPageChunk: ({ html }) => {
			if (!GOOGLE_ANALYTICS_ID) {
				return html.replace('%sveltekit.analytics%', '');
			}

			const analyticsScript = `
					<script async src="https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}"></script>
					<script>
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', '${GOOGLE_ANALYTICS_ID}');
					</script>`;

			return html.replace('%sveltekit.analytics%', analyticsScript);
		}
	});
};
