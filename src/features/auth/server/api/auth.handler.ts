import type { RequestHandler } from '@sveltejs/kit';
import { AuthController } from './auth.controller';
import { db } from 'shared/db';
import { AUTH_API_ROUTING } from 'features/auth/config/auth-api-routing';
import type { User } from 'shared/db/schema';

export type AuthRequestParams = {
	username: string;
	password: string;
};

export type AuthSuccessResponse = {
	userId: User['id'];
};
export type AuthErrorResponse = {
	error: string;
};
export type AuthResponse = AuthSuccessResponse | AuthErrorResponse;

export class AuthHandler {
	authController: AuthController;
	constructor() {
		this.authController = new AuthController(db);
	}

	private login(): RequestHandler {
		return async (event) => {
			try {
				const data = (await event.request.json()) as AuthRequestParams;
				const validate = this.validateCredentials(data);
				if (!validate) {
					const { session } = await this.authController.login(event, data);
					const response: AuthSuccessResponse = {
						userId: session.userId
					};

					return new Response(JSON.stringify(response), {
						headers: { 'Content-Type': 'application/json' }
					});
				}
				return validate;
			} catch (error) {
				const response: AuthErrorResponse = {
					error: error instanceof Error ? error.message : 'Unknown error'
				};
				return new Response(JSON.stringify(response), {
					status: 400,
					headers: { 'Content-Type': 'application/json' }
				});
			}
		};
	}

	private register(): RequestHandler {
		return async (event) => {
			try {
				const data = (await event.request.json()) as AuthRequestParams;
				const validate = this.validateCredentials(data);
				if (!validate) {
					const { session } = await this.authController.register(event, data);
					const response: AuthSuccessResponse = {
						userId: session.userId
					};

					return new Response(JSON.stringify(response), {
						headers: { 'Content-Type': 'application/json' }
					});
				}
				return validate;
			} catch (error: unknown) {
				const response: AuthErrorResponse = {
					error: error instanceof Error ? error.message : 'Unknown error'
				};
				return new Response(JSON.stringify(response), {
					status: 400,
					headers: { 'Content-Type': 'application/json' }
				});
			}
		};
	}

	private logout(): RequestHandler {
		return async (event) => {
			await this.authController.logout(event);
			return new Response(JSON.stringify({ status: 'ok' }), {
				headers: { 'Content-Type': 'application/json' }
			});
		};
	}

	private validateCredentials(data: AuthRequestParams) {
		if (data.username === '' || data.password === '') {
			const response: AuthErrorResponse = {
				error: 'Username and password are required'
			};
			return new Response(JSON.stringify(response), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}
		return false;
	}

	getHandlers() {
		return {
			[AUTH_API_ROUTING.LOGIN]: this.login(),
			[AUTH_API_ROUTING.REGISTER]: this.register(),
			[AUTH_API_ROUTING.LOGOUT]: this.logout()
		};
	}
}
