import { redirectForAuthorized } from 'features/auth/server/guards/redirect-for-authorized';
import { ROUTES_MAP } from 'shared/lib/routes';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	await redirectForAuthorized(ROUTES_MAP.user);
};
