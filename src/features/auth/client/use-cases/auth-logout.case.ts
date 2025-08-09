import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { ROUTES_MAP } from 'shared/lib/routes';
import { AuthApiClient } from '../api';

export const error = writable<string | null>(null);
export const loading = writable(false);

export const logout = async () => {
	loading.set(true);
	error.set(null);
	try {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		await AuthApiClient.logout();
		await goto(ROUTES_MAP.auth);
	} catch (e) {
		console.error('Logout error:', e);
		error.set('Logout failed. Please try again.');
	} finally {
		loading.set(false);
	}
};
