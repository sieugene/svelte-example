import { authRouteGuard } from 'features/auth/server/guards/auth-route-guard';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const auth = await authRouteGuard();
	return { auth };
};

