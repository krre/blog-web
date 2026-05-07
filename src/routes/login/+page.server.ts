import { API_SERVER_URL } from '$env/static/private';
import { getRequestEvent } from '$app/server';

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		console.log({ data, API_SERVER_URL });
		const body = {
			username: data.get('username'),
			password: data.get('password')
		};

		const { locals, getClientAddress } = getRequestEvent();
		const response = await fetch(`${API_SERVER_URL}/auth/login`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'content-type': 'application/json',
				'x-forwarded-for': getClientAddress()
			}
		});

		const text = await response.text();
		console.log({ response, text });
	}
};
