import { authRouteGuard } from 'features/auth/server/guards/auth-route-guard';
import type { PageServerLoad } from './$types';
import type { Auth } from 'features/auth/types';

// For strict return
type UserPageProps = {
	auth: Auth;
};

export const load: PageServerLoad = async () => {
	const auth = await authRouteGuard();
	const pageProps: UserPageProps = { auth };
	return pageProps;
};
