import type { User } from 'shared/db/schema';

export type Auth = {
	user: Omit<User, 'passwordHash'>;
	// session: Session;
};
