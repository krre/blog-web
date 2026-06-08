import { API_SERVER_URL } from '$env/static/private';
import { getRequestEvent } from '$app/server';
import { error } from '@sveltejs/kit';

export async function get<Request, Response>(
	endpoint: string,
	params?: Request
): Promise<Response> {
	return send(endpoint, 'GET', params);
}

export async function post<Request, Response>(
	endpoint: string,
	params?: Request
): Promise<Response> {
	return send(endpoint, 'POST', params);
}

export async function put<Request, Response>(
	endpoint: string,
	params?: Request
): Promise<Response> {
	return send(endpoint, 'PUT', params);
}

export async function patch<Request, Response>(
	endpoint: string,
	params?: Request
): Promise<Response> {
	return send(endpoint, 'PATCH', params);
}

export async function del<Request, Response>(
	endpoint: string,
	params?: Request
): Promise<Response> {
	return send(endpoint, 'DELETE', params);
}

async function send<Request, Response>(
	endpoint: string,
	method: string,
	params?: Request
): Promise<Response> {
	const { getClientAddress, cookies } = getRequestEvent();
	const headers: HeadersInit = {
		'content-type': 'application/json',
		'x-forwarded-for': getClientAddress()
	};

	const jwt = cookies.get('jwt');

	if (jwt) {
		headers['authorization'] = `bearer ${jwt}`;
	}

	let url = new URL(`${API_SERVER_URL}/${endpoint}`);
	let body = undefined;

	if (params) {
		if (method == 'GET') {
			Object.entries(params).forEach(([key, value]) => {
				if (value !== undefined) {
					url.searchParams.append(key, String(value));
				}
			});
		} else {
			body = JSON.stringify(params);
		}
	}

	const response = await fetch(url, {
		method,
		body,
		headers
	});

	if (!response.ok) {
		error(response.status, await response.text());
	}

	const text = await response.text();

	if (!text) {
		return undefined as Response;
	}

	return JSON.parse(text) as Response;
}
