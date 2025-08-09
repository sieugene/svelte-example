import { goto } from '$app/navigation';
import { ROUTES_MAP } from 'shared/lib/routes';
import { get, writable } from 'svelte/store';
import { AuthApiClient } from '../api';

export type AUTH_FORM_TYPE = 'login' | 'register';
export const username = writable('');
export const password = writable('');
export const error = writable<string | null>(null);
export const loading = writable(false);

export async function submit(type: AUTH_FORM_TYPE) {
	loading.set(true);
	error.set(null);
	try {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		if (type === 'login') {
			await AuthApiClient.login({ password: get(password), username: get(username) });
		}
		if (type === 'register') {
			await AuthApiClient.register({ password: get(password), username: get(username) });
		}
		await goto(ROUTES_MAP.user);
	} catch (e) {
		console.error('Login error:', e);
		error.set('Login failed. Please try again.');
	} finally {
		loading.set(false);
	}
}
