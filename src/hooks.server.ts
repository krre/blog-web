import type { User } from '$lib/types';
import type { Handle } from '@sveltejs/kit';
import { jwtDecode } from 'jwt-decode';

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

	return resolve(event);
};
