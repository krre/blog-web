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

	const response = await fetch(`${API_SERVER_URL}/${endpoint}`, {
		method,
		body: JSON.stringify(params),
		headers
	});

	if (!response.ok) {
		error(response.status, await response.text());
	}

	return (await response.json()) as Response;
}
