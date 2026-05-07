import { API_SERVER_URL } from '$env/static/private';

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		console.log({ data, API_SERVER_URL });
	}
};
