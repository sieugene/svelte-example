// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Auth } from 'features/auth/types';

// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			auth?: Auth | null;
			// session: import('$lib/server/auth').SessionValidationResult['session'];
		}
	} // interface Error {}
	// interface Locals {}
} // interface PageData {}
// interface PageState {}

// interface Platform {}
export {};
