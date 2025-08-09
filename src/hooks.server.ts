import { sequence } from '@sveltejs/kit/hooks';

import type { Handle } from '@sveltejs/kit';
import { authMiddleware } from 'features/auth/server/middlewares/auth.middleware';
import { paraglideMiddleware } from '$lib/paraglide/server';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});

export const handle: Handle = sequence(handleParaglide, authMiddleware);
