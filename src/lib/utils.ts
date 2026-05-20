import type { Cookies } from '@sveltejs/kit';

export function saveJwt(cookies: Cookies, jwt: string) {
	cookies.set('jwt', jwt, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: true,
		maxAge: 60 * 60 * 24 * 365 // 1 year
	});
}

export function fullUserName(firstName: string, lastName: string): string {
	return !lastName.length ? firstName : firstName + ' ' + lastName;
}
