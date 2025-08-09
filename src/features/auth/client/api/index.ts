import { AUTH_API_ROUTING } from 'features/auth/config/auth-api-routing';
import type { AuthRequestParams, AuthResponse } from 'features/auth/server/api/auth.handler';

class AuthApi {
	apiUrl: string;
	constructor() {
		this.apiUrl = AUTH_API_ROUTING.BASE;
	}

	async register(data: AuthRequestParams) {
		const response = await fetch(`${this.apiUrl}/${AUTH_API_ROUTING.REGISTER}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});
		return response.json();
	}

	async login(data: AuthRequestParams) {
		const response = await fetch(`${this.apiUrl}/${AUTH_API_ROUTING.LOGIN}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});
		const json = (await response.json()) as AuthResponse;

		if (json.error) {
			throw new Error(json.error || 'Login failed');
		}
		return json;
	}
}

export const AuthApiClient = new AuthApi();
