import { AuthHandler } from 'features/auth/server/api/auth.handler.js';

const authHandler = new AuthHandler();

export const POST = async (event) => {
	const handlers = authHandler.getHandlers();
	const action = event.params.action as keyof typeof handlers;

	const handler = handlers[action]?.bind(authHandler);
	if (!handler) {
		return new Response('Not Found', { status: 404 });
	}

	return handler(event);
};
