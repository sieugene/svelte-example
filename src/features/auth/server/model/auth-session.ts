import type { RequestEvent } from '@sveltejs/kit';
import { AUTH_SESSION_COOKIE_NAME } from 'features/auth/config/auth-cookies';
import { db, type DatabaseEntity } from 'shared/db';
import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import { DB_SCHEMAS, type Session, type User } from 'shared/db/schema';
import { eq } from 'drizzle-orm';

const DAY_IN_MS = 1000 * 60 * 60 * 24;
const SESSION_DURATION_DAYS = 30;
const SESSION_RENEW_THRESHOLD_DAYS = 15;

class SessionManager {
	constructor(private readonly dbService: DatabaseEntity) {}

	getSessionToken(event: RequestEvent) {
		const sessionToken = event.cookies.get(AUTH_SESSION_COOKIE_NAME);
		return sessionToken;
	}

	setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
		event.cookies.set(AUTH_SESSION_COOKIE_NAME, token, {
			expires: expiresAt,
			path: '/'
		});
	}

	deleteSessionTokenCookie(event: RequestEvent): void {
		event.cookies.delete(AUTH_SESSION_COOKIE_NAME, { path: '/' });
	}

	generateSessionToken(): string {
		const bytes = crypto.getRandomValues(new Uint8Array(18));
		return encodeBase64url(bytes);
	}

	private isSessionExpired(session: Session): boolean {
		return Date.now() >= session.expiresAt.getTime();
	}

	private shouldRenewSession(session: Session): boolean {
		const renewThreshold = session.expiresAt.getTime() - SESSION_RENEW_THRESHOLD_DAYS * DAY_IN_MS;
		return Date.now() >= renewThreshold;
	}

	async getSessionIdFromToken(token: string): Promise<string> {
		const hash = await sha256(new TextEncoder().encode(token));
		return encodeHexLowerCase(hash);
	}

	async validateSessionToken(
		token: string
	): Promise<{ session: Session | null; user: Omit<User, 'passwordHash'> | null }> {
		const sessionId = await this.getSessionIdFromToken(token);

		const [result] = await this.dbService
			.select({
				user: {
					id: DB_SCHEMAS.user.id,
					username: DB_SCHEMAS.user.username,
					age: DB_SCHEMAS.user.age
				},
				session: DB_SCHEMAS.session
			})
			.from(DB_SCHEMAS.session)
			.innerJoin(DB_SCHEMAS.user, eq(DB_SCHEMAS.session.userId, DB_SCHEMAS.user.id))
			.where(eq(DB_SCHEMAS.session.id, sessionId));

		if (!result) {
			return { session: null, user: null };
		}

		const { session, user } = result;

		if (this.isSessionExpired(session)) {
			await this.invalidateSession(session.id);
			return { session: null, user: null };
		}

		if (this.shouldRenewSession(session)) {
			session.expiresAt = new Date(Date.now() + SESSION_DURATION_DAYS * DAY_IN_MS);
			await this.dbService
				.update(DB_SCHEMAS.session)
				.set({ expiresAt: session.expiresAt })
				.where(eq(DB_SCHEMAS.session.id, session.id));
		}

		return { session, user };
	}

	async createSession(token: string, userId: string): Promise<Session> {
		const sessionId = await this.getSessionIdFromToken(token);
		const expiresAt = new Date(Date.now() + SESSION_DURATION_DAYS * DAY_IN_MS);

		const session: Session = {
			id: sessionId,
			userId,
			expiresAt
		};

		await this.dbService.insert(DB_SCHEMAS.session).values(session);
		return session;
	}

	async invalidateSession(sessionId: string): Promise<void> {
		await this.dbService.delete(DB_SCHEMAS.session).where(eq(DB_SCHEMAS.session.id, sessionId));
	}
}

export const AuthSession = new SessionManager(db);
