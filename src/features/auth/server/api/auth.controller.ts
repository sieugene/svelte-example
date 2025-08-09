import { DB_SCHEMAS } from 'shared/db/schema';
import { generateUserId, validatePassword, validateUsername } from '../lib';
import type { AuthRequestParams } from './auth.handler';
import { type DatabaseEntity } from 'shared/db';
import { hash, verify } from '@node-rs/argon2';
import { eq } from 'drizzle-orm';
import { AuthSession } from '../model/auth-session';
import type { RequestEvent } from '@sveltejs/kit';

export class AuthController {
	constructor(private readonly dbService: DatabaseEntity) {}
	async login(event: RequestEvent, params: AuthRequestParams) {
		const { password, username } = params;

		if (!validateUsername(username)) {
			throw new Error('Invalid username (min 3, max 31 characters, alphanumeric only)');
		}
		if (!validatePassword(password)) {
			throw new Error('Invalid password (min 6, max 255 characters)');
		}

		const results = await this.dbService
			.select()
			.from(DB_SCHEMAS.user)
			.where(eq(DB_SCHEMAS.user.username, username));

		const existingUser = results.at(0);
		if (!existingUser) {
			throw new Error('Incorrect username or password');
		}

		const validPassword = await verify(existingUser.passwordHash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		if (!validPassword) {
			throw new Error('Incorrect username or password');
		}

		const sessionToken = AuthSession.generateSessionToken();
		const session = await AuthSession.createSession(sessionToken, existingUser.id);
		AuthSession.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		return { session, sessionToken };
	}

	async register(event: RequestEvent, params: AuthRequestParams) {
		const { password, username } = params;
		if (!validateUsername(username)) {
			throw new Error('Invalid username (min 3, max 31 characters, alphanumeric only)');
		}
		if (!validatePassword(password)) {
			throw new Error('Invalid password (min 6, max 255 characters)');
		}

		const userId = generateUserId();
		const passwordHash = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		try {
			await this.dbService.insert(DB_SCHEMAS.user).values({ id: userId, username, passwordHash });

			const sessionToken = AuthSession.generateSessionToken();
			const session = await AuthSession.createSession(sessionToken, userId);
			AuthSession.setSessionTokenCookie(event, sessionToken, session.expiresAt);
			return { session, sessionToken };
		} catch {
			throw new Error('An error has occurred while registering the user');
		}
	}

	async logout(event: RequestEvent) {
		const sessionToken = AuthSession.getSessionToken(event);

		if (sessionToken) {
			const sessionId = await AuthSession.getSessionIdFromToken(sessionToken);
			await AuthSession.invalidateSession(sessionId);
			AuthSession.deleteSessionTokenCookie(event);
		}
	}
}
