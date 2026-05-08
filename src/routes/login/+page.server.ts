import { API_SERVER_URL } from '$env/static/private';
import { getRequestEvent } from '$app/server';

interface JWT {
	token: string;
}

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();

		const body = {
			username: data.get('username'),
			password: data.get('password')
		};

		const { getClientAddress } = getRequestEvent();
		const response = await fetch(`${API_SERVER_URL}/auth/login`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'content-type': 'application/json',
				'x-forwarded-for': getClientAddress()
			}
		});

		const jwt = (await response.json()) as JWT;

		cookies.set('jwt', jwt.token, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: true,
			maxAge: 60 * 60 * 24 * 365 // 1 year
		});
	}
};
