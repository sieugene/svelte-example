import { getRequestEvent } from '$app/server';
import { redirect } from '@sveltejs/kit';
import { ROUTES_MAP } from 'shared/lib/routes';

export const authRouteGuard = async () => {
	const { locals } = getRequestEvent();

	if (!locals.auth?.user) {
		return redirect(302, ROUTES_MAP.auth);
	}

	return locals.auth;
};
