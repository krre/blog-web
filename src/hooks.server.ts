import type { Handle } from '@sveltejs/kit';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
	sub: string;
	user_id: number;
	exp: number;
	company: string;
}

export const handle: Handle = async ({ event, resolve }) => {
	const jwt = event.cookies.get('jwt');
	event.locals.userId = jwt ? jwtDecode<JwtPayload>(jwt).user_id : 0;
	return resolve(event);
};
