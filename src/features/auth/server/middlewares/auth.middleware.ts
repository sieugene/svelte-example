import type { Handle } from '@sveltejs/kit';
import { AuthSession } from '../model/auth-session';

export const authMiddleware: Handle = async ({ event, resolve }) => {
	const sessionToken = AuthSession.getSessionToken(event)

	if (!sessionToken) {
		event.locals.auth = null;
		return resolve(event);
	}

	const { session, user } = await AuthSession.validateSessionToken(sessionToken);

	if (session) {
		AuthSession.setSessionTokenCookie(event, sessionToken!, session.expiresAt);
	} else {
		AuthSession.deleteSessionTokenCookie(event);
	}

	event.locals.auth = {
		user: user!,
		// session: session!
	};

	return resolve(event);
};
