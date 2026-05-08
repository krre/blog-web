import * as api from '$lib/api';

interface User {
	username: string;
	password: string;
}

interface JWT {
	token: string;
}

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();

		const user: User = {
			username: data.get('username')?.toString() || '',
			password: data.get('password')?.toString() || ''
		};

		const jwt: JWT = await api.post('auth/login', user);

		cookies.set('jwt', jwt.token, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: true,
			maxAge: 60 * 60 * 24 * 365 // 1 year
		});
	}
};
