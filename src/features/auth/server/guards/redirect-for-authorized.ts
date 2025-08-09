import { getRequestEvent } from '$app/server';
import { redirect } from '@sveltejs/kit';

export const redirectForAuthorized = async (redirectTo: string) => {
	const { locals } = getRequestEvent();
	if (locals.auth?.user) {
		return redirect(302, redirectTo);
	}
};
